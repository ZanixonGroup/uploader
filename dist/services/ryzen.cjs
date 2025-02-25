"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RyzenUploader = void 0;
var axios_1 = require("axios");
var form_data_1 = require("form-data");
var helper_js_1 = require("./../utils/helper.js");
async function RyzenUploader(buffer) {
    if (!Buffer.isBuffer(buffer))
        throw new Error("Invalid buffer input!");
    if ((0, helper_js_1.FileSize)(buffer) >= (0, helper_js_1.MaxFileSize)(100))
        throw new Error("Max size upload for RyzenCDN is only 100MB!");
    const mime = await (0, helper_js_1.MimeType)(buffer);
    if (!mime || !mime.ext || !mime.mime)
        throw new Error("Failed to determine file MIME type!");
    const form = new form_data_1.default();
    form.append("file", buffer, {
        filename: `zxn-${Date.now()}.${mime.ext}`,
        contentType: mime.mime
    });
    const raw = await axios_1.default.post("https://api.ryzendesu.vip/api/uploader/ryzencdn", form, {
        headers: { ...form.getHeaders() }
    });
    if (!raw.data?.url)
        throw new Error("Failed upload, no response from server!");
    return raw?.data?.url;
}
exports.RyzenUploader = RyzenUploader;
module.exports = exports.default;
module.exports.default = exports.default;
