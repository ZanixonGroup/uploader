import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper.js";

export async function ErhabotUploader(buffer) {
  if(!Buffer.isBuffer(buffer)) throw Error('Invalid buffer input!');
  if((await FileSize(buffer)) >= MaxFileSize(5)) throw Error('The maximum upload size for images is 5 MB!');
  
  const mime = await MimeType(buffer);
  if(!["jpg","jpeg","png"].includes(mime.ext)) throw Error('Only support image!')
  
  const form = new FormData();
  form.append("file", Buffer.from(buffer), {
    filename: "zxn-" + Date.now() + "." + mime.ext,
    contentType: mime.mime
  });
  const raw = await axios.post("https://cdn.erhabot.com/upload", form, {
    headers: {
      ...form.getHeaders()
    }
  });
  
  return raw?.data?.data?.url || null;
}
