import API from "../api/axios";

export const sendTicket = async (ticket) => {
  const fileName = `ticket-${Date.now()}.json`;
  try {
    const { data } = await API.post("/dropbox/upload", {
      fileName,
      json: ticket,
    });
    return data;
  } catch (err) {
    console.error("Upload failed:", err.response?.data || err.message);
    throw err;
  }
};
