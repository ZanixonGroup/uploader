import axios from "axios";
import FormData from "form-data";
import { FileSize, MimeType } from "./../utils/helper.js";

export async function NauvalUploader(buffer) {
  if (!Buffer.isBuffer(buffer)) throw new Error('Invalid buffer input!');
  if ((await FileSize(buffer)) > 100 * 1024 * 1024) throw new Error('File size terlalu besar (Max 100MB)');
  
  const mime = await MimeType(buffer);
  const form = new FormData();
  form.append("file", buffer, {
    filename: "upload-" + Date.now() + "." + mime.ext,
    contentType: mime.mime
  });
  
  const raw = await axios.post("https://Nauval.mycdn.biz.id/upload", form, {
    headers: {
      ...form.getHeaders(),
      'origin': 'https://Nauval.mycdn.biz.id',
      'user-agent': 'Postify/1.0.0'
    }
  });
  
  return raw?.data?.fileUrl || null;
}
