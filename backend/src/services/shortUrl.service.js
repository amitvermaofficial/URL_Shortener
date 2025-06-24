import { createShortUrl } from "../dao/shortUrl.js";
import { generateId } from "../utils/helper.js";

const shortUrlService = async (full_url, user_id) => {
  const short_url = generateId(7);
  if (user_id) {
    await createShortUrl(full_url, short_url, user_id);
  } else {
    await createShortUrl(full_url, short_url);
  } 
  return short_url;
}

export default shortUrlService