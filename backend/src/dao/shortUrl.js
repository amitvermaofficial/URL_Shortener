import urlSchema from "../models/shortUrlSchema.js";
import { ConflictError } from "../utils/errorHandler.js";

export const createShortUrl = async (full_url, short_url, user_id) => {
  try {
    const newUrl = new urlSchema({
      full_url,
      short_url,
    });

    if (user_id) {
      newUrl.user_id = user_id;
    }
    await newUrl.save();
  } catch (error) {
    if (error.code == 11000) {
      throw new ConflictError(error);
    }

    throw new Error(error);
  }
}

export const getShortUrl = async (short_url) => {
  const url = await urlSchema.findOneAndUpdate({ short_url }, { $inc: { clicks:1 } });
  return url;
}