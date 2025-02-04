import { fileTypeFromBuffer } from 'file-type';

export function FileSize(buffer) {
  if (!Buffer.isBuffer(buffer)) {
    throw new Error('invalid buffer input!');
  }
  return buffer.length;
}

export async function MimeType(buffer) {
  if (!Buffer.isBuffer(buffer)) {
    throw new Error('invalid buffer input!');
  }
  const type = await fileTypeFromBuffer(buffer);
  return type || undefined;
}