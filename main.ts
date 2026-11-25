// make.fun news-image-20261125 entry.
// Copies the repository's entry.png to the grader's output directory,
// after checking it is a whole PNG or JPEG within the competition's limits:
// at most 1 MiB and at most 1024 by 1024 pixels.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const MAX_BYTES = 1048576;
const MAX_DIMENSION = 1024;

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(botDir, "entry.png");
const dst = join(outDir, "entry.png");

function fail(message: string): never {
  console.error(`entry: ${message}`);
  process.exit(1);
}

function pngDimensions(buf: Buffer): [number, number] | null {
  // PNG signature, then the IHDR chunk: width and height are the first
  // 8 bytes of the chunk data, big-endian uint32 each.
  if (buf.length < 24 || buf.readUInt32BE(12) !== 0x49484452) return null;
  return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
}

function jpegDimensions(buf: Buffer): [number, number] | null {
  // Walk JPEG segments until a Start Of Frame marker gives height and width.
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) return null;
    const marker = buf[i + 1];
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2;
      continue;
    }
    const len = buf.readUInt16BE(i + 2);
    if (len < 2 || i + 2 + len > buf.length) return null;
    if (
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf)
    ) {
      return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
    }
    i += 2 + len;
  }
  return null;
}

if (!existsSync(src)) fail(`entry.png not found in ${botDir}`);

const image = readFileSync(src);
if (image.length > MAX_BYTES) {
  fail(`entry.png is ${image.length} bytes, over the 1048576-byte limit`);
}

const isPng =
  image.length >= 8 &&
  image.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
const isJpeg = image.length >= 3 && image[0] === 0xff && image[1] === 0xd8 && image[2] === 0xff;
if (!isPng && !isJpeg) fail("entry.png is neither a PNG nor a JPEG");

const dims = isPng ? pngDimensions(image) : jpegDimensions(image);
if (dims === null) fail("could not read the image dimensions");
const [width, height] = dims;
if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
  fail(`image is ${width}x${height}, over the 1024x1024 limit`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(dst, image);
console.log(`entry: wrote ${dst} (${width}x${height}, ${image.length} bytes)`);
