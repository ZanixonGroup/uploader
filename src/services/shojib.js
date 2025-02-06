import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper.js";

export async function ShojibUploader(buffer) {
  if(!Buffer.isBuffer(buffer)) throw Error('Invalid buffer input!');
  if((await FileSize(buffer)) >= MaxFileSize(100)) throw Error('Max size upload for ShojibCDN is only 100MB!');
  
  const mime = await MimeType(buffer);
  const form = new FormData();
  form.append("file", Buffer.from(buffer), {
    filename: "zxn" + "." + mime.ext,
    contentType: mime.mime
  });
  const raw = await axios.post("https://chat-gpt.photos/api/uploadImage", form, {
    headers: {
      ...form.getHeaders()
    }
  });
  
  return raw?.data?.location || null;
}