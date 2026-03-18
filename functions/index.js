const functions = require("firebase-functions");
const axios = require("axios");

exports.getZaloPhone = functions.https.onCall(async (data, context) => {
  // Dữ liệu từ App gửi lên: token số điện thoại và access token
  const { token, accessToken } = data;
  
  // Lấy Secret Key trong Zalo Cloud Center -> Thiết lập ứng dụng
  const APP_SECRET_KEY = "sa_2HRpdmsdRITzFjU37PynFtq-gwC9apKNOJp8sLvul7xpdtc8"; 

  try {
    const response = await axios.get("https://graph.zalo.me/v2.0/me/info", {
      headers: {
        access_token: accessToken,
        code: token,
        secret_key: APP_SECRET_KEY,
      },
    });

    // Trả kết quả về cho Mini App
    return response.data; 
  } catch (error) {
    console.error("Lỗi:", error);
    return { error: -1, message: "Lỗi kết nối API" };
  }
});