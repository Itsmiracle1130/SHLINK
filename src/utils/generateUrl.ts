import { randomInt } from 'crypto';
import {urlModel} from "../model/url.model"

export function generateRandomId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = randomInt(0, characters.length);
      randomId += characters.charAt(randomIndex);
    }
  
    return randomId;
  }

  export const generateUniqueShortCode = async () => {
    while (true) {
      const shortCode = generateRandomId(5);
      const existingURL = await urlModel.findOne({ shortCode });
      if (!existingURL) {
        return shortCode;
      }
    }
  };