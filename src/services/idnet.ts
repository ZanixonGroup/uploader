import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper";

export async function IDNet(data: Uint8Array) {
  if(!Buffer.isBuffer(data)) throw new Error("Invalid buffer input!");
  if(FileSize(data) >= MaxFileSize(1000)) throw new Error("Max file upload for catbox is only 1GB!");
  
  const mime = await MimeType(data);
  const form = new FormData();
  form.append("file", Buffer.from(data), {
    filename: mime ? "zxn-" + Date.now() + "." + mime?.ext : "",
    contentType: mime?.mime || ""
  });
  const raw = await axios.post("https://file.idnet.my.id/upload.php", form, {
    headers: {
      ...form.getHeaders(),
      'origin': 'https://file.idnet.my.id',
      'user-agent': 'Postify/1.0.0'
    }
  });

  return raw?.data?.file?.url || null;
}

export default IDNet;