import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper.js";

/**
 * Fungsi untuk mengunggah file ke Uguu.se
 * @param {Buffer} buffer - Buffer dari file yang ingin diunggah
 * @returns {Promise<string|null>} - Link file yang diunggah atau null jika gagal
 */
export async function UguuUploader(buffer) {
  if (!Buffer.isBuffer(buffer)) throw new Error('Invalid buffer input!');
  if ((await FileSize(buffer)) >= MaxFileSize(100)) throw new Error('Max upload size for Uguu.se is 100 MiB!');

  const mime = await MimeType(buffer);
  const form = new FormData();
  form.append("files[]", Buffer.from(buffer), {
    filename: "uguu-" + Date.now() + "." + mime.ext,
    contentType: mime.mime
  });

  const raw = await axios.post("https://uguu.se/upload", form, {
    headers: {
      ...form.getHeaders(),
      'origin': 'https://uguu.se',
      'user-agent': 'UguuUploader/1.0.0'
    }
  });

  return raw?.data || null;
}
