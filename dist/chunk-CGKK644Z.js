import {
  FileSize,
  MaxFileSize,
  MimeType
} from "./chunk-FKD7EMZE.js";

// src/services/ryzen.ts
import axios from "axios";
import FormData from "form-data";
async function RyzenUploader(buffer) {
  var _a, _b;
  if (!Buffer.isBuffer(buffer)) throw new Error("Invalid buffer input!");
  if (FileSize(buffer) >= MaxFileSize(100)) throw new Error("Max size upload for RyzenCDN is only 100MB!");
  const mime = await MimeType(buffer);
  if (!mime || !mime.ext || !mime.mime) throw new Error("Failed to determine file MIME type!");
  const form = new FormData();
  form.append("file", buffer, {
    filename: `zxn-${Date.now()}.${mime.ext}`,
    contentType: mime.mime
  });
  const raw = await axios.post("https://api.ryzendesu.vip/api/uploader/ryzencdn", form, {
    headers: { ...form.getHeaders() }
  });
  if (!((_a = raw.data) == null ? void 0 : _a.url)) throw new Error("Failed upload, no response from server!");
  return (_b = raw == null ? void 0 : raw.data) == null ? void 0 : _b.url;
}

export {
  RyzenUploader
};
