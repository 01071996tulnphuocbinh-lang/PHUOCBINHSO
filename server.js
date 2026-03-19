const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Server running");
});

app.post("/api/get-phone", async (req, res) => {
  try {
    const token = req.body?.token;

    if (!token || typeof token !== "string" || !token.trim()) {
      return res.status(400).json({
        success: false,
        message: "Token is required",
      });
    }

    const zaloAccessToken = process.env.ZALO_ACCESS_TOKEN;

    if (!zaloAccessToken) {
      return res.status(500).json({
        success: false,
        message: "Missing ZALO_ACCESS_TOKEN",
      });
    }

    console.log("Incoming token:", token);

    const zaloResponse = await axios.get(
      "https://graph.zalo.me/v2.0/me/info",
      {
        params: {
          access_token: zaloAccessToken,
          code: token,
        },
        timeout: 5000,
      }
    );

    console.log("Zalo API response:", zaloResponse.data);

    const data = zaloResponse.data || {};
    const phone =
      data.phone ||
      data.number ||
      data.data?.phone ||
      data.data?.number ||
      data.data?.phone_number ||
      null;

    if (!phone) {
      return res.status(404).json({
        success: false,
        message: "Phone not found",
      });
    }

    return res.json({
      success: true,
      phone: String(phone),
    });
  } catch (error) {
    const message =
      error.response?.data?.error_description ||
      error.response?.data?.message ||
      error.message ||
      "Internal server error";

    console.error("Error in /api/get-phone:", message);

    return res.status(500).json({
      success: false,
      message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
