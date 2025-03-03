export function FileSize(data: Uint8Array) {
  if (!(data instanceof Uint8Array)) throw new Error("Invalid buffer data!");
  return data.length;
}

export function MaxFileSize(data: number) {
  if (!Number.isInteger(data)) throw new Error("Invalid number data!");
  return data * 1024576;
}

export async function MimeType(data: Uint8Array) {
  if (!(data instanceof Uint8Array)) throw new Error("Invalid buffer data!");
  const { fileTypeFromBuffer } = await import('file-type');
  return fileTypeFromBuffer(data);
}