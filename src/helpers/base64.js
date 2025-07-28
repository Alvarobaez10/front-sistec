import { Buffer } from "buffer";
export function encode64(dato) {
  return Buffer.from(String(dato), "utf8").toString("base64");
}

export function decode64(encodedData) {
  let decoded = Buffer.from(encodedData, "base64").toString("utf8");
  let output = decoded
    .replace(/\|\|a\|\|/g, "\xe1")
    .replace(/\|\|e\|\|/g, "\xe9")
    .replace(/\|\|i\|\|/g, "\xed")
    .replace(/\|\|o\|\|/g, "\xf3")
    .replace(/\|\|u\|\|/g, "\xfa")
    .replace(/\|\|A\|\|/g, "\xc1")
    .replace(/\|\|E\|\|/g, "\xc9")
    .replace(/\|\|I\|\|/g, "\xcd")
    .replace(/\|\|O\|\|/g, "\xd3")
    .replace(/\|\|U\|\|/g, "\xda")
    .replace(/\|\|n\|\|/g, "\xf1")
    .replace(/\|\|N\|\|/g, "\xd1")
    .replace(/\|\|\!\|\|/g, "\xa1")
    .replace(/\|\|\?\|\|/g, "\xbf")
    .replace(/\|\|UU\|\|/g, "\xdc")
    .replace(/\|\|uu\|\|/g, "\xfc")
    .replace(/\|\|\.\|\|/g, ".");
  return output;
}

