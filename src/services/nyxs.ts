import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper";

export async function Nyxs(data: Uint8Array) {
  if(!Buffer.isBuffer(data)) throw new Error("Invalid buffer input!");
  if(FileSize(data) >= MaxFileSize(1000)) throw new Error("Max file upload for catbox is only 1GB!");
  
  const mime = await MimeType(data);
  const form = new FormData();
  form.append("file", Buffer.from(data), {
    filename: mime ? "zxn-" + Date.now() + "." + mime?.ext : "",
    contentType: mime?.mime || ""
  });
  const raw = await axios.post("https://uploader.nyxs.pw/upload", form, {
    headers: {
      ...form.getHeaders(),
      'origin': 'https://uploader.nyxs.pw',
      'user-agent': 'Postify/1.0.0'
    }
  });

  return raw?.data?.match(/https:\/\/uploader\.nyxs\.pw\/tmp\/[A-Za-z0-9\-]+\.[A-Za-z0-9]+/)[0] || null;
}

export default Nyxs;