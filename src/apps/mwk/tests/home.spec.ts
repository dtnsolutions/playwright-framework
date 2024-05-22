import { test, describe } from '../fixtures';
import * as locators from '../locators/home.locator';
import * as data from '../data/home.data.json';

describe('Home', () => {
  test('Verify home page', async ({ homePage, commonPage }) => {
    await homePage.open();
    await homePage.closePopup();
    await homePage.verifyTitle();
    await homePage.verifyNavigationMenu();
  });
});
