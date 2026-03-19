const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.options("*", cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Server running");
});

app.post("/api/get-phone", async (req, res) => {
  try {
    const token =
      req.body?.token ||
      req.body?.phoneToken ||
      req.body?.code; // hỗ trợ token/phoneToken/code
    const miniAppId = req.body?.miniAppId || "";

    if (!token || typeof token !== "string" || !token.trim()) {
      return res.status(400).json({
        success: false,
        error: 1,
        message: "Token is required",
      });
    }

    const bearerToken = String(req.headers?.authorization || "").replace(/^Bearer\s+/i, "");
    const tokenFromRequest =
      req.body?.ZALO_ACCESS_TOKEN ||
      req.body?.zalo_access_token ||
      req.body?.zaloAccessToken ||
      req.body?.access_token ||
      req.body?.accessToken ||
      req.headers?.["x-zalo-access-token"] ||
      req.headers?.["X-ZALO-ACCESS-TOKEN"] ||
      bearerToken ||
      "";

    // Ưu tiên token backend cấu hình sẵn (ổn định hơn), fallback token client gửi lên.
    const accessTokenCandidates = [process.env.ZALO_ACCESS_TOKEN, tokenFromRequest]
      .filter(Boolean)
      .map(v => String(v).trim())
      .filter(Boolean)
      .filter((v, idx, arr) => arr.indexOf(v) === idx);

    if (accessTokenCandidates.length === 0) {
      return res.status(500).json({
        success: false,
        error: 1,
        message: "Missing ZALO_ACCESS_TOKEN",
      });
    }

    const diagnostics = [];
    for (const zaloAccessToken of accessTokenCandidates) {
      try {
        const zaloResponse = await axios.get("https://graph.zalo.me/v2.0/me/info", {
          params: {
            access_token: zaloAccessToken,
            code: token,
          },
          timeout: 10000,
        });

        const data = zaloResponse.data || {};
        const phone =
          data.phone ||
          data.number ||
          data.phone_number ||
          data.data?.phone ||
          data.data?.number ||
          data.data?.phone_number ||
          null;

        diagnostics.push({
          source: zaloAccessToken === process.env.ZALO_ACCESS_TOKEN ? "env" : "request",
          status: zaloResponse.status,
          hasPhone: !!phone,
          upstreamData: data,
        });

        if (!phone) {
          continue;
        }

        const phoneText = String(phone);
        return res.json({
          success: true,
          error: 0,
          phone: phoneText,
          data: {
            phoneNumber: phoneText,
            phone: phoneText,
            number: phoneText,
          },
          miniAppId,
          diagnostics,
        });
      } catch (err) {
        diagnostics.push({
          source: zaloAccessToken === process.env.ZALO_ACCESS_TOKEN ? "env" : "request",
          status: err.response?.status || 500,
          hasPhone: false,
          upstreamData: err.response?.data || null,
          message:
            err.response?.data?.error_description ||
            err.response?.data?.message ||
            err.message ||
            "Upstream error",
        });
      }
    }

    return res.status(404).json({
      success: false,
      error: 1,
      message: "Phone not found",
      diagnostics,
    });
  } catch (error) {
    const message =
      error.response?.data?.error_description ||
      error.response?.data?.message ||
      error.message ||
      "Internal server error";

    return res.status(500).json({
      success: false,
      error: 1,
      message,
      details: error.response?.data || null,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
