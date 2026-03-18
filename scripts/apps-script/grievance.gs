/**
 * Google Apps Script backend cho module Phan anh kien nghi
 * Action:
 * - create-grievance
 * - get-my-grievances
 */

var FOLDER_ID = "1YMhy2GBtpYZ9oMe_ERoPoTp2h6OeB2vt";
var SHEET_NAME = "Sheet1";

var HEADERS = [
  "ID",
  "Thời gian",
  "Họ tên",
  "Số điện thoại",
  "Khu vực",
  "Nội dung",
  "Link Ảnh",
  "Nội dung trả lời phản ánh",
  "Trạng thái",
  "User ID",
  "MiniApp ID",
  "Phone Token"
];

function doPost(e) {
  try {
    var data = parseBody_(e);
    var action = String(data.action || "create-grievance");

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();

    ensureHeaders_(sheet);
    applyStatusDropdown_(sheet);

    if (action === "create-grievance") {
      return handleCreateGrievance_(sheet, data);
    }

    if (action === "get-my-grievances") {
      return handleGetMyGrievances_(sheet, data);
    }

    return jsonOut_({ error: 1, message: "Unsupported action: " + action });
  } catch (err) {
    return jsonOut_({ error: 1, message: "Error: " + err.toString() });
  }
}

function doGet(e) {
  try {
    var params = (e && e.parameter) ? e.parameter : {};
    var action = String(params.action || "");

    if (action === "get-my-grievances") {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
      ensureHeaders_(sheet);
      applyStatusDropdown_(sheet);
      return handleGetMyGrievances_(sheet, params);
    }

    return jsonOut_({ error: 0, message: "API is running. Use POST." });
  } catch (err) {
    return jsonOut_({ error: 1, message: "Error: " + err.toString() });
  }
}

function handleCreateGrievance_(sheet, data) {
  var finalImageUrl = "Không có ảnh";
  // Luôn để trống phản hồi khi tạo mới; cột này chỉ cập nhật thủ công bởi cán bộ xử lý.
  data.response = "";

  if (data.image && String(data.image).indexOf("data:image") === 0) {
    try {
      var folder = DriveApp.getFolderById(FOLDER_ID);
      var timeStamp = Utilities.formatDate(new Date(), "GMT+7", "dd-MM-yyyy_HHmm");
      var safeName = String(data.fullName || "NguoiDung").replace(/\s+/g, "_");
      var safePhone = normalizePhone_(data.phoneNumber || "unknown");
      var fileName = safePhone + "_" + safeName + "_" + timeStamp + ".jpg";

      var splitData = String(data.image).split(",");
      var contentType = splitData[0].match(/:(.*?);/)[1];
      var bytes = Utilities.base64Decode(splitData[1]);
      var blob = Utilities.newBlob(bytes, contentType, fileName);

      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      finalImageUrl = file.getUrl();
    } catch (errDrive) {
      finalImageUrl = "Lỗi lưu Drive: " + errDrive.toString();
    }
  }

  var createdId = appendGrievanceRow_(sheet, data, finalImageUrl);

  return jsonOut_({
    error: 0,
    message: "Success",
    data: {
      id: createdId,
      userId: String(data.userId || ""),
      miniAppId: String(data.miniAppId || ""),
      phoneToken: String(data.phoneToken || "")
    }
  });
}

function handleGetMyGrievances_(sheet, data) {
  var values = sheet.getDataRange().getValues();
  if (values.length <= 1) return jsonOut_({ error: 0, data: [] });

  var header = values[0];
  var rows = values.slice(1);
  var idx = indexMap_(header);

  var reqUserId = String(data.userId || "").trim();
  var reqPhone = normalizePhone_(data.phoneNumber || "");
  var reqName = String(data.fullName || "").trim().toUpperCase();
  var reqMiniAppId = String(data.miniAppId || "").trim();

  var result = rows.map(function(r, i) {
    return {
      id: String(safeCell_(r, idx["ID"]) || (i + 2)),
      createdAt: safeCell_(r, idx["Thời gian"]),
      fullName: String(safeCell_(r, idx["Họ tên"]) || ""),
      phoneNumber: normalizePhone_(safeCell_(r, idx["Số điện thoại"]) || ""),
      location: String(safeCell_(r, idx["Khu vực"]) || ""),
      content: String(safeCell_(r, idx["Nội dung"]) || ""),
      imageUrl: String(safeCell_(r, idx["Link Ảnh"]) || ""),
      response: String(safeCell_(r, idx["Nội dung trả lời phản ánh"]) || ""),
      status: String(safeCell_(r, idx["Trạng thái"]) || "Đã tiếp nhận"),
      userId: String(safeCell_(r, idx["User ID"]) || ""),
      miniAppId: String(safeCell_(r, idx["MiniApp ID"]) || ""),
      phoneToken: String(safeCell_(r, idx["Phone Token"]) || "")
    };
  }).filter(function(item) {
    var byApp = !reqMiniAppId || item.miniAppId === reqMiniAppId;
    var byUserId = reqUserId && item.userId === reqUserId;
    var byPhone = reqPhone && item.phoneNumber === reqPhone;
    var byName = !reqUserId && !reqPhone && reqName && item.fullName.trim().toUpperCase() === reqName;
    return byApp && (byUserId || byPhone || byName);
  });

  result.sort(function(a, b) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return jsonOut_({ error: 0, data: result });
}

function appendGrievanceRow_(sheet, data, imageUrl) {
  var header = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  var idx = indexMap_(header);
  var row = new Array(HEADERS.length).fill("");
  var id = Utilities.getUuid();

  function setByName(name, value) {
    if (idx[name] === undefined) throw new Error("Missing header: " + name);
    row[idx[name]] = value;
  }

  setByName("ID", id);
  setByName("Thời gian", new Date());
  setByName("Họ tên", String(data.fullName || ""));
  setByName("Số điện thoại", "'" + normalizePhone_(data.phoneNumber || ""));
  setByName("Khu vực", String(data.location || ""));
  setByName("Nội dung", String(data.content || ""));
  setByName("Link Ảnh", imageUrl || "Không có ảnh");
  // Không nhận phản hồi từ client tại bước tạo mới.
  setByName("Nội dung trả lời phản ánh", "");
  setByName("Trạng thái", "Đã tiếp nhận");
  setByName("User ID", String(data.userId || ""));
  setByName("MiniApp ID", String(data.miniAppId || ""));
  setByName("Phone Token", String(data.phoneToken || ""));

  sheet.appendRow(row);
  return id;
}

function ensureHeaders_(sheet) {
  if (sheet.getMaxColumns() < HEADERS.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), HEADERS.length - sheet.getMaxColumns());
  }

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  styleHeader_(sheet, HEADERS.length);
}

function styleHeader_(sheet, colCount) {
  sheet.getRange(1, 1, 1, colCount)
    .setBackground("#1d4ed8")
    .setFontColor("white")
    .setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function applyStatusDropdown_(sheet) {
  var idx = indexMap_(HEADERS);
  var col = idx["Trạng thái"];
  if (col === undefined) return;

  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Đã tiếp nhận", "Đang xử lý", "Đã xử lý"], true)
    .setAllowInvalid(false)
    .build();

  var startRow = 2;
  var numRows = Math.max(sheet.getMaxRows() - 1, 1);
  sheet.getRange(startRow, col + 1, numRows, 1).setDataValidation(rule);
}

function parseBody_(e) {
  if (e && e.postData && e.postData.contents) {
    var raw = String(e.postData.contents).trim();
    if (raw) {
      try { return JSON.parse(raw); } catch (err) {}
    }
  }
  if (e && e.parameter) {
    if (e.parameter.payload) {
      try { return JSON.parse(e.parameter.payload); } catch (err2) {}
    }
    return e.parameter;
  }
  return {};
}

function normalizePhone_(v) {
  var s = String(v || "").replace(/^'/, "").replace(/\D/g, "");
  if (s.indexOf("84") === 0 && s.length === 11) return "0" + s.slice(2);
  return s;
}

function indexMap_(headerRow) {
  var m = {};
  for (var i = 0; i < headerRow.length; i++) {
    m[String(headerRow[i]).trim()] = i;
  }
  return m;
}

function safeCell_(row, index) {
  if (index === undefined || index === null || index < 0 || index >= row.length) return "";
  return row[index];
}

function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
