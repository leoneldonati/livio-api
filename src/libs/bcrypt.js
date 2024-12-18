import { compare, hash } from "bcrypt";

export async function compareHash(hash, pass) {
  return await compare(pass, hash);
}

export async function encryptString(str) {
  return await hash(str, 10);
}
