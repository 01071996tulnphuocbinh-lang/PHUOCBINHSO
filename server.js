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

const pickString = value => {
  const text = String(value || "").trim();
  return text || "";
};

const isTokenInvalidError = payload => {
  const code = Number(payload?.error);
  const message = String(payload?.message || "").toLowerCase();
  return (
    code === 452 ||
    code === -216 ||
    message.includes("session key invalid") ||
    message.includes("access token") ||
    message.includes("token invalid") ||
    message.includes("invalid token")
  );
};

const maskToken = value => {
  const text = pickString(value);
  if (!text) return "";
  if (text.length <= 14) return text;
  return `${text.slice(0, 10)}...${text.slice(-4)}`;
};

const exchangeOAToken = async ({ appId, secretKey, grantType, code, refreshToken }) => {
  const body = new URLSearchParams({
    app_id: appId,
    grant_type: grantType,
    secret_key: secretKey,
    ...(grantType === "authorization_code" ? { code } : {}),
    ...(grantType === "refresh_token" ? { refresh_token: refreshToken } : {}),
  }).toString();

  const response = await axios.post("https://oauth.zaloapp.com/v4/oa/access_token", body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    timeout: 15000,
  });

  return response.data || {};
};

const tokenState = {
  accessToken: pickString(process.env.ZALO_ACCESS_TOKEN),
  refreshToken: pickString(process.env.ZALO_REFRESH_TOKEN),
  refreshedAt: "",
};

const refreshOATokenIfNeeded = async ({ appId, secretKey, force = false }) => {
  if (!force && tokenState.accessToken) {
    return { refreshed: false, accessToken: tokenState.accessToken };
  }

  if (!tokenState.refreshToken) {
    return {
      refreshed: false,
      accessToken: tokenState.accessToken,
      error: "Missing ZALO_REFRESH_TOKEN in server environment",
    };
  }

  const data = await exchangeOAToken({
    appId,
    secretKey,
    grantType: "refresh_token",
    refreshToken: tokenState.refreshToken,
  });

  const newAccessToken = pickString(data.access_token);
  const newRefreshToken = pickString(data.refresh_token);

  if (!newAccessToken) {
    return {
      refreshed: false,
      accessToken: tokenState.accessToken,
      error: "Refresh token flow returned empty access_token",
      payload: data,
    };
  }

  tokenState.accessToken = newAccessToken;
  if (newRefreshToken) tokenState.refreshToken = newRefreshToken;
  tokenState.refreshedAt = new Date().toISOString();

  return {
    refreshed: true,
    accessToken: tokenState.accessToken,
    refreshTokenMasked: maskToken(tokenState.refreshToken),
    refreshedAt: tokenState.refreshedAt,
  };
};

app.post("/api/oa/access-token", async (req, res) => {
  try {
    const appId = pickString(req.body?.appId || process.env.ZALO_APP_ID);
    const secretKey = pickString(req.body?.secretKey || process.env.ZALO_SECRET_KEY);
    const grantType = pickString(req.body?.grantType || "authorization_code");
    const code = pickString(req.body?.code);
    const refreshToken = pickString(req.body?.refreshToken);

    if (!appId) {
      return res.status(400).json({ success: false, error: 1, message: "Missing appId" });
    }
    if (!secretKey) {
      return res.status(400).json({ success: false, error: 1, message: "Missing secretKey" });
    }
    if (grantType !== "authorization_code" && grantType !== "refresh_token") {
      return res.status(400).json({
        success: false,
        error: 1,
        message: "grantType must be authorization_code or refresh_token",
      });
    }
    if (grantType === "authorization_code" && !code) {
      return res.status(400).json({ success: false, error: 1, message: "Missing code" });
    }
    if (grantType === "refresh_token" && !refreshToken) {
      return res.status(400).json({ success: false, error: 1, message: "Missing refreshToken" });
    }

    const data = await exchangeOAToken({
      appId,
      secretKey,
      grantType,
      code,
      refreshToken,
    });

    const accessToken = pickString(data.access_token);
    const newRefreshToken = pickString(data.refresh_token);
    if (accessToken) tokenState.accessToken = accessToken;
    if (newRefreshToken) tokenState.refreshToken = newRefreshToken;
    tokenState.refreshedAt = new Date().toISOString();

    return res.json({
      success: true,
      error: 0,
      message: "OK",
      data: {
        ...data,
        access_token_masked: maskToken(accessToken),
        refresh_token_masked: maskToken(newRefreshToken),
      },
      note: "Hãy copy access_token để set vào ZALO_ACCESS_TOKEN trên Render.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 1,
      message:
        error.response?.data?.error_description ||
        error.response?.data?.message ||
        error.message ||
        "Token exchange failed",
      details: error.response?.data || null,
    });
  }
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

    // Ưu tiên token trong memory (đã refresh), fallback env token.
    const envAccessToken = pickString(process.env.ZALO_ACCESS_TOKEN);
    const accessTokenCandidates = [tokenState.accessToken, envAccessToken]
      .filter(Boolean)
      .filter((v, idx, arr) => arr.indexOf(v) === idx);

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
        const callDecodePhone = async accessToken =>
          axios.get("https://graph.zalo.me/v2.0/me/info", {
            params: {
              access_token: accessToken,
              code: token,
              ...(appId ? { app_id: appId } : {}),
              ...(secretKey ? { secret_key: secretKey } : {}),
            },
            timeout: 10000,
          });

        let zaloResponse = await callDecodePhone(zaloAccessToken);
        let data = zaloResponse.data || {};
        let refreshed = false;

        if (isTokenInvalidError(data)) {
          try {
            const refreshedToken = await refreshOATokenIfNeeded({
              appId,
              secretKey,
              force: true,
            });

            diagnostics.push({
              source: "env",
              refreshedAttempt: true,
              refreshedResult: refreshedToken?.error || "ok",
              refreshedAt: refreshedToken?.refreshedAt || "",
            });

            if (refreshedToken?.accessToken) {
              const retry = await callDecodePhone(refreshedToken.accessToken);
              data = retry.data || {};
              zaloResponse = retry;
              refreshed = true;
            }
          } catch (refreshErr) {
            diagnostics.push({
              source: "env",
              refreshedAttempt: true,
              refreshedResult: String(refreshErr?.message || refreshErr),
            });
          }
        }

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
          tokenRefreshed: refreshed,
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
          tokenRefreshed: false,
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
