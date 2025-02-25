var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/helper.ts
var helper_exports = {};
__export(helper_exports, {
  FileSize: () => FileSize,
  MaxFileSize: () => MaxFileSize,
  MimeType: () => MimeType
});
module.exports = __toCommonJS(helper_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FileSize,
  MaxFileSize,
  MimeType
});
