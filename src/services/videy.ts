import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper";

export async function Videy(data: Uint8Array) {
  if(!Buffer.isBuffer(data)) throw new Error("Invalid buffer input!");
  if(FileSize(data) >= MaxFileSize(1000)) throw Error('Max size upload for VideyCDN is only 1GB!');

  const mime = await MimeType(data);
  if(!mime || !["mp4","mov"].includes(mime?.ext)) throw Error('Wrong filetype, please select an .mp4 or .mov')

  const form = new FormData();
  form.append("file", Buffer.from(data), {
    filename: mime ? "zxn-" + Date.now() + "." + mime.ext : "",
    contentType: mime?.mime || ""
  });
  const raw = await axios.post("https://videy.co/api/upload", form, {
    headers: {
      ...form.getHeaders()
    }
  });

  return "https://cdn.videy.co/" + raw?.data?.id + "." + mime?.ext || null;
}

export default Videy;