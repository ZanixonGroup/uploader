import axios from "axios";
import FormData from "form-data";
import { fileTypeFromBuffer } from "file-type";
import { v4 as uuidv4 } from "uuid";
import util from "util";

const { isBuffer } = Buffer;

async function telegraph(buffer) {
  try {
    if(!buffer) return { status: false, message: "undefined reading buffer" };
    if(!isBuffer(buffer)) return { status: false, message: "invalid buffer input!" };
    return await new Promise(async(resolve, reject) => {
      const { mime, ext } = await fileTypeFromBuffer(buffer);
      const form = new FormData();
      form.append("photo", buffer, {
        filename: uuidv4() + `.${ext}`,
        contentType: mime
      });
      axios.post("https://telegra.ph/upload", form, {
        headers: form.getHeaders()
      }).then(async res => {
        const data = res.data;
        if(Array.isArray(data) && data.length === 0) return reject("failed uploading media to telegraph!");
        resolve({
          status: true,
          url: "https://telegra.ph" + data[0].src
        })
      }).catch(reject)
    })
  } catch (e) {
    return { status: false, message: e.message, logs: util.format(e) }
  }
}

async function sazumi(buffer) {
  try {
    if(!buffer) return { status: false, message: "undefined reading buffer" };
    if(!isBuffer(buffer)) return { status: false, message: "invalid buffer input!" };
    return await new Promise(async (resolve, reject) => {
      const { mime, ext } = await fileTypeFromBuffer(buffer);
      const form = new FormData();
      form.append("fileInput", buffer, {
        filename: uuidv4() + `.${ext}`,
        contentType: mime
      });
      axios.post("https://cdn.sazumi.moe/upload", form, {
        headers: form.getHeaders()
      }).then(res => {
        const file = res.data;
        if(file.status !== "success") return reject("failed uploading file!");
        return resolve({
          status: true,
          url: file.url_response
        })
      })
    })
  } catch (e) {
    return { status: false, message: e.message, logs: util.format(e) }
  }
}

async function aemt(buffer) {
  try {
    if(!buffer) return { status: false, message: "undefined reading buffer" };
    if(!isBuffer(buffer)) return { status: false, message: "invalid buffer input!" };
    return await new Promise(async (resolve, reject) => {
      const { mime, ext } = await fileTypeFromBuffer(buffer);
      const form = new FormData();
      form.append("file", buffer, uuidv4() + `.${ext}`);
      axios.post("https://aemt.me/api/upload.php", form, {
        headers: form.getHeaders()
      }).then(async res => {
        const data = res.data;
        if(!data.status) return reject("failed uploading media to aemt cdn");
        resolve({ status: true, url: data?.result?.url })
      }).catch(reject)
    });
  } catch (e) {
    return { status: false, message: e.message, logs: util.format(e) }
  }
}

async function pomf(buffer) {
  try {
    if(!buffer) return { status: false, message: "undefined reading buffer" };
    if(!isBuffer(buffer)) return { status: false, message: "invalid buffer input!" };
    return await new Promise(async (resolve, reject) => {
      const { mime, ext } = await fileTypeFromBuffer(buffer);
      console.log(mime)
      const form = new FormData();
      form.append("files[]", buffer, {
        filename: uuidv4() + `.${ext}`,
        contentType: mime
      });
      axios.post("https://pomf.lain.la/upload.php", form, {
        headers: form.getHeaders()
      }).then(res => {
        const data = res.data;
        if(!data.success) return reject("failed uploading media to pomf")
        resolve({
          status: true,
          url: data?.files[0]?.url
        })
      }).catch(reject)
    });
  } catch (e) {
    return { status: false, message: e.message, logs: util.format(e) }
  }
}

export default {
  telegraph,
  sazumi,
  aemt,
  pomf
}