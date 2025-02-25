// src/utils/helper.ts
import { fileTypeFromBuffer } from "file-type";
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
  const type = await fileTypeFromBuffer(buffer);
  return type;
}

export {
  FileSize,
  MaxFileSize,
  MimeType
};
