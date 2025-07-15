const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

let accessToken = null;
let expiresAt = 0;

const getAccessToken = async () => {
  const now = Date.now();
  if (accessToken && now < expiresAt - 60_000) return accessToken; // valid for >60s

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: process.env.DROPBOX_REFRESH_TOKEN,
    client_id: process.env.DROPBOX_CLIENT_ID,
    client_secret: process.env.DROPBOX_CLIENT_SECRET,
  });
  const { data } = await axios.post(
    "https://api.dropbox.com/oauth2/token",
    params
  );
  accessToken = data.access_token;
  expiresAt = now + data.expires_in * 1000;
  return accessToken;
};

const uploadJsonToDropbox = async (fileName, json) => {
  const token = await getAccessToken();
  const blob = Buffer.from(JSON.stringify(json, null, 2));
  await axios.post("https://content.dropboxapi.com/2/files/upload", blob, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/octet-stream",
      "Dropbox-API-Arg": JSON.stringify({
        path: `/SupportTickets/${fileName}`,
        mode: "add",
        autorename: true,
        mute: false,
      }),
    },
  });
};

module.exports = { uploadJsonToDropbox };
