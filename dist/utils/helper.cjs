"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MimeType = exports.MaxFileSize = exports.FileSize = void 0;
var file_type_1 = require("file-type");
function FileSize(buffer) {
    if (!Buffer.isBuffer(buffer))
        throw new Error("Invalid buffer input!");
    return buffer.length;
}
exports.FileSize = FileSize;
function MaxFileSize(size) {
    if (!size)
        throw new Error("Missing size input!");
    if (!Number.isInteger(size))
        throw new Error("Invalid size number input!");
    return size * 1024576;
}
exports.MaxFileSize = MaxFileSize;
async function MimeType(buffer) {
    if (!Buffer.isBuffer(buffer))
        throw new Error('invalid buffer input!');
    const type = await (0, file_type_1.fileTypeFromBuffer)(buffer);
    return type;
}
exports.MimeType = MimeType;
module.exports = exports.default;
module.exports.default = exports.default;
