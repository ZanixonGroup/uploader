import fs from "fs/promises";
import { dirname } from "desm";
import Unit from "./../src/services/fasturl.ts";

const __dirname = dirname(import.meta.url);

async function UnitTest() {
  try {
    const image = await fs.readFile(__dirname + "/../malas_ngoding.jpg");
    const result = await Unit(Buffer.from(image));
    console.log(result);
  } catch (e) {
    console.error("Emror banh:", e);
  }
}

UnitTest();