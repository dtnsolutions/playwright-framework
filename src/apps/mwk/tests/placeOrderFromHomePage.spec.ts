import { test, describe } from '../fixtures';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

describe('Place order from homepage', () => {
  test('Add to cart', async ({ homePage, commonPage }) => {
    await homePage.open();
    await homePage.closePopup();
    await homePage.login(process.env.USER_NAME, process.env.PASSWORD);
    await homePage.addProductToCart();
    await homePage.goToCart();
    await homePage.addPayment();
    await homePage.placeOrder();
    await homePage.verifyOrderSuccess();
  });
});
