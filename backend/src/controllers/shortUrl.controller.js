import { getShortUrl } from "../dao/shortUrl.js";
import shortUrlService from "../services/shortUrl.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res, next) => {
    const { full_url } = req.body;
    const short_url = process.env.APP_URI + await shortUrlService(full_url);
    res.send(short_url);

});

export const redirectFromShortUrl = wrapAsync( async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  res.redirect(url.full_url);
});

