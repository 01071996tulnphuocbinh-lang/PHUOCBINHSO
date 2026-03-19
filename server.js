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
    const token = req.body?.token || req.body?.code; // hỗ trợ cả token/code
    const miniAppId = req.body?.miniAppId || "";

    if (!token || typeof token !== "string" || !token.trim()) {
      return res.status(400).json({
        success: false,
        error: 1,
        message: "Token is required",
      });
    }

    const zaloAccessToken = process.env.ZALO_ACCESS_TOKEN;
    if (!zaloAccessToken) {
      return res.status(500).json({
        success: false,
        error: 1,
        message: "Missing ZALO_ACCESS_TOKEN",
      });
    }

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

    if (!phone) {
      return res.status(404).json({
        success: false,
        error: 1,
        message: "Phone not found",
      });
    }

    const phoneText = String(phone);

    // Trả cả format cũ + format frontend đang parse
    return res.json({
      success: true,
      error: 0,
      phone: phoneText,
      data: {
        phoneNumber: phoneText,
      },
      miniAppId,
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
