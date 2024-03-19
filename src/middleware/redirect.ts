

import express, {Request, Response} from "express"
const router = express.Router();
import {urlModel} from "../model/url.model"

// Route for handling URL redirection
router.get('/:shortUrl', async (req: Request, res: Response) => {
  try {
    // Find the URL by short URL
    const url = await urlModel.findOne({ shortUrl: req.params.shortUrl });

    if (!url) {
      return res.status(404).send('URL not found');
    }

    // Increment click count
    url.clickCount++;
    await url.save();

    // Redirect to the long URL
    res.redirect(url.longUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

export default router
