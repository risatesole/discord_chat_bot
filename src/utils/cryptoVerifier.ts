import nacl from "tweetnacl";
import { hexToUint8Array } from "./HexToUint8Array.js";

export function verifySignature(message: string, signatureHex: string, publicKeyHex: string): boolean {
  return nacl.sign.detached.verify(
    Buffer.from(message),
    hexToUint8Array(signatureHex),
    hexToUint8Array(publicKeyHex)
  );
}
