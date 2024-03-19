import { Request, Response, NextFunction } from "express";
import { urlModel } from "../model/url.model";

export async function handleRedirect(req: Request, res: Response, next: NextFunction) {
  // Find the original URL from the database using the id from the request parameters
  const shortUrl = req.params.id;
  const urlData = await urlModel.findOne({ shortUrl });

    // const urlData = await urlModel.findById(req.params.id);

  if (!urlData) {
    // If the URL is not found in the database, send a 404 error
    return res.status(404).send("URL not found");
  }else{

  // Redirect the user to the original URL
  res.redirect(urlData.longUrl);

  next()
}
}