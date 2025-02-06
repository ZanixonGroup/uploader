import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize MimeType } from "./../utils/helper.js";

export async function VideyUploader(buffer) {
  if(!Buffer.isBuffer(buffer)) throw Error('Invalid buffer input!');
  if((await FileSize(buffer)) >= MaxFileSize(1000)) throw Error('Max size upload for VideyCDN is only 1GB!');
  
  const mime = await MimeType(buffer);
  if(!["mp4","mov"].includes(mime.ext)) throw Error('Wrong filetype, please select an .mp4 or .mov')
  
  const form = new FormData();
  form.append("file", Buffer.from(buffer), {
    filename: "zxn-" + Date.now() + "." + mime.ext,
    contentType: mime.mime
  });
  const raw = await axios.post("https://videy.co/api/upload", form, {
    headers: {
      ...form.getHeaders()
    }
  });
  
  return "https://cdn.videy.co/" + raw?.data?.id + "." + mime.ext || null;
}