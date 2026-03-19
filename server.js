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
    const appId = String(process.env.ZALO_APP_ID || miniAppId || "").trim();
    const secretKey = String(process.env.ZALO_SECRET_KEY || "").trim();

    if (!token || typeof token !== "string" || !token.trim()) {
      return res.status(400).json({
        success: false,
        error: 1,
        message: "Token is required",
      });
    }

    // Bắt buộc dùng token backend cấu hình sẵn để tránh nhầm session token từ client.
    const envAccessToken = String(process.env.ZALO_ACCESS_TOKEN || "").trim();
    const accessTokenCandidates = envAccessToken ? [envAccessToken] : [];

    if (accessTokenCandidates.length === 0) {
      return res.status(500).json({
        success: false,
        error: 1,
        message: "Missing ZALO_ACCESS_TOKEN in server environment",
      });
    }

    const diagnostics = [];
    for (const zaloAccessToken of accessTokenCandidates) {
      try {
        const zaloResponse = await axios.get("https://graph.zalo.me/v2.0/me/info", {
          params: {
            access_token: zaloAccessToken,
            code: token,
            ...(appId ? { app_id: appId } : {}),
            ...(secretKey ? { secret_key: secretKey } : {}),
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
          source: "env",
          status: zaloResponse.status,
          hasPhone: !!phone,
          hasAppId: !!appId,
          hasSecretKey: !!secretKey,
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
          source: "env",
          status: err.response?.status || 500,
          hasPhone: false,
          hasAppId: !!appId,
          hasSecretKey: !!secretKey,
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
