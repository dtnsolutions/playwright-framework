import { test as baseTest } from '@playwright/test';
import CommonPage from '@common/pages/common.page';
import HomePage from '../pages/home.page';
import LoginPage from '../pages/login.page';

type pages = {
  commonPage: CommonPage;
  homePage: HomePage;
  loginPage: LoginPage
};

const testPages = baseTest.extend<pages>({
  commonPage: async ({ page }, use, workerInfo) => {
    await use(new CommonPage(page, workerInfo));
  },
  homePage: async ({ page }, use, workerInfo) => {
    await use(new HomePage(page, workerInfo));
  },
  loginPage: async ({ page }, use, workerInfo) => {
    await use(new LoginPage(page, workerInfo));
  }
});

export const test = testPages;
export const expect = testPages.expect;
export const describe = testPages.describe;
