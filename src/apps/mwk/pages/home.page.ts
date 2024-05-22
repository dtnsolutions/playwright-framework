import type { Page, TestInfo } from '@playwright/test';
import { test, expect } from '../fixtures';
import * as data from '../data/home.data.json';
import * as actions from '@utils/base/web/actions';
import * as locators from '../locators/home.locator';

export default class HomePage {
  constructor(
    public page: Page,
    public workerInfo: TestInfo,
  ) {}

  async open() {
    await actions.navigateTo(this.page, process.env.URL, this.workerInfo);
    // move the mouse to make sure all the Hyva JS is loaded
    await this.page.mouse.move(0, 1);
  }

  async closePopup() {
    await this.page.getByTestId(locators.closePopupButtonTestId).click();
  }

  async verifyTitle() {
    await actions.verifyPageTitle(this.page, data.title, this.workerInfo);
  }

  // check if the menu is displayed and hoverable
  async verifyNavigationMenu() {
    await test.step(
      this.workerInfo.project.name +
        ': Hovering on ' +
        data.MXMenuItemText +
        ' menu item',
      async () =>
        this.page.locator('a:has-text("' + data.MXMenuItemText + '")').hover(),
    );

    await test.step(
      this.workerInfo.project.name +
        ': Verify if ' +
        data.MXMenuItemText +
        ' sub menu is visible',
      async () => {
        const subMenu = this.page.locator(
          'a:has-text("' + data.MXMenuItemText + '") + div',
        );
        const isVisible = await subMenu.isVisible();
        expect(isVisible).toBe(true);
      }
    );
  }

  // async canSearchFromHomePage() {
  //   await actions.typeText(
  //     this.page,
  //     locators.searchBox,
  //     data.searchText,
  //     this.workerInfo,
  //   );
  //   await actions.clickElement(
  //     this.page,
  //     locators.searchButton,
  //     this.workerInfo,
  //   );
  //   await actions.waitForNavigation(this.page, this.workerInfo);
  // }

  // async canAddToCart() {
  //   await actions.clickElement(
  //     this.page,
  //     locators.addToCartButton,
  //     this.workerInfo,
  //   );
  // }
}
