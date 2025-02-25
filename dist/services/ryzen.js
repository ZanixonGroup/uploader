import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper.js";
export async function RyzenUploader(buffer) {
    if (!Buffer.isBuffer(buffer))
        throw new Error("Invalid buffer input!");
    if (FileSize(buffer) >= MaxFileSize(100))
        throw new Error("Max size upload for RyzenCDN is only 100MB!");
    const mime = await MimeType(buffer);
    if (!mime || !mime.ext || !mime.mime)
        throw new Error("Failed to determine file MIME type!");
    const form = new FormData();
    form.append("file", buffer, {
        filename: `zxn-${Date.now()}.${mime.ext}`,
        contentType: mime.mime,
    });
    const raw = await axios.post("https://api.ryzendesu.vip/api/uploader/ryzencdn", form, {
        headers: { ...form.getHeaders() },
    });
    if (!raw.data?.url)
        throw new Error("Failed upload, no response from server!");
    return raw?.data?.url;
}
