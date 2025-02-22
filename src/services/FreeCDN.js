import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper.js";

/**
 * Fungsi untuk mengunggah file ke SecurityHub
 * @param {Buffer} buffer - Buffer dari file yang ingin diunggah
 * @returns {Promise<string|null>} - Response dari server atau null jika gagal
 */
export async function SecurityHubUploader(buffer) {
  if (!Buffer.isBuffer(buffer)) throw new Error('Invalid buffer input!');
  if ((await FileSize(buffer)) >= MaxFileSize(100)) throw new Error('Max upload size is 100 MiB!');

  const mime = await MimeType(buffer);
  const form = new FormData();
  form.append("file", Buffer.from(buffer), {
    filename: "securityhub-" + Date.now() + "." + mime.ext,
    contentType: mime.mime
  });

  try {
    const response = await axios.post("https://apiss.securityhub.id/upload", form, {
      headers: {
        ...form.getHeaders(),
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://apiss.securityhub.id/'
      }
    });
    return response?.data || null;
  } catch (error) {
    console.error("Upload failed:", error.message);
    return null;
  }
}
