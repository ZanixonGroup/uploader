var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  RyzenUploader: () => RyzenUploader
});
module.exports = __toCommonJS(index_exports);

// src/services/ryzen.ts
var import_axios = __toESM(require("axios"), 1);
var import_form_data = __toESM(require("form-data"), 1);

// src/utils/helper.ts
var import_file_type = require("file-type");
function FileSize(buffer) {
  if (!Buffer.isBuffer(buffer)) throw new Error("Invalid buffer input!");
  return buffer.length;
}
function MaxFileSize(size) {
  if (!size) throw new Error("Missing size input!");
  if (!Number.isInteger(size)) throw new Error("Invalid size number input!");
  return size * 1024576;
}
async function MimeType(buffer) {
  if (!Buffer.isBuffer(buffer)) throw new Error("invalid buffer input!");
  const type = await (0, import_file_type.fileTypeFromBuffer)(buffer);
  return type;
}

// src/services/ryzen.ts
async function RyzenUploader(buffer) {
  var _a, _b;
  if (!Buffer.isBuffer(buffer)) throw new Error("Invalid buffer input!");
  if (FileSize(buffer) >= MaxFileSize(100)) throw new Error("Max size upload for RyzenCDN is only 100MB!");
  const mime = await MimeType(buffer);
  if (!mime || !mime.ext || !mime.mime) throw new Error("Failed to determine file MIME type!");
  const form = new import_form_data.default();
  form.append("file", buffer, {
    filename: `zxn-${Date.now()}.${mime.ext}`,
    contentType: mime.mime
  });
  const raw = await import_axios.default.post("https://api.ryzendesu.vip/api/uploader/ryzencdn", form, {
    headers: { ...form.getHeaders() }
  });
  if (!((_a = raw.data) == null ? void 0 : _a.url)) throw new Error("Failed upload, no response from server!");
  return (_b = raw == null ? void 0 : raw.data) == null ? void 0 : _b.url;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RyzenUploader
});
