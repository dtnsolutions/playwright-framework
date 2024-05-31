import { test, describe } from '../fixtures';
import * as locators from '../locators/home.locator';
import * as data from '../data/home.data.json';
import HomePage from '../pages/home.page';
import CommonPage from '../../common/pages/common.page';

describe('Place order from homepage', () => {
  test('Add to cart', async ({ homePage, commonPage }) => {
    await homePage.open();
    await homePage.closePopup();
    await homePage.addProductToCart();
    await homePage.login();
  });
});
