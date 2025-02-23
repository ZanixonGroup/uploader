import { fileTypeFromBuffer } from "file-type";

export function FileSize(buffer: Buffer): number {
  if(!Buffer.isBuffer(buffer)) throw new Error("Invalid buffer input!");
  return buffer.length
}

export function MaxFileSize(size: number): number {
  if(!size) throw new Error("Missing size input!");
  if(!Number.isInteger(size)) throw new Error("Invalid size number input!");
  return size * 1024576;
}

export async function MimeType(buffer: Buffer): Promise<string> {
  if (!Buffer.isBuffer(buffer)) throw new Error('invalid buffer input!');
  const type = await fileTypeFromBuffer(buffer);
  return type;
}