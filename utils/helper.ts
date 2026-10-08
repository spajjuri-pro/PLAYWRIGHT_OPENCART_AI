import dotenv from 'dotenv';

dotenv.config();

export class Helper {
  static convertPriceToNumber(price: string): number {
    const cleanedPrice = price.replace(/[$,\s]/g, '');
    return Number.parseFloat(cleanedPrice);
  }

  static getProductDetails() {
    return {
      name: 'MacBook',
      quantity: 1,
      price: '$602.00',
    };
  }

  static getLoginDetails() {
    return {
      email: process.env.APP_EMAIL ?? '',
      password: process.env.APP_PASSWORD ?? '',
    };
  }
}
