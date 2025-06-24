import { nanoid } from "nanoid"

export const generateId = (len) => {
  return len ? nanoid(len) : nanoid(7);
}