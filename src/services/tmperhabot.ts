import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper";

export async function TmpErhabot(data: Uint8Array) {
  if(!Buffer.isBuffer(data)) throw new Error("Invalid buffer input!");
  if(FileSize(data) >= MaxFileSize(100)) throw new Error("Max file upload for catbox is only 100MB!");
  
  const mime = await MimeType(data);
  const form = new FormData();
  form.append("someFiles", Buffer.from(data), {
    filename: mime ? "zxn-" + Date.now() + "." + mime.ext : "",
    contentType: mime?.mime || ""
  });
  const raw = await axios.post("https://tmp.erhabot.xyz/api/upload", form, {
    headers: {
      ...form.getHeaders()
    }
  });

  return raw?.data?.data?.url || null;
}

export default TmpErhabot;