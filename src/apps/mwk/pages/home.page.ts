import type { Page, TestInfo } from '@playwright/test';
import { test, expect } from '../fixtures';
import * as data from '../data/home.data.json';
import * as actions from '@utils/base/web/actions';
import * as locators from '../locators/home.locator';

export default class HomePage {
  constructor(
    public page: Page,
    public workerInfo: TestInfo,
  ) { }

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

  async login(username: string, password: string) {
    // Wait for the user menu button to be clickable
    await this.page.waitForSelector(locators.userMenu, { state: 'visible' });

    // Click the user menu button
    await this.page.click(locators.userMenu);

    // Wait for the login button to be clickable
    await this.page.waitForSelector(locators.loginBtn, { state: 'visible' });

    // Click the login button
    await this.page.click(locators.loginBtn);

    // Wait for the login popup to be visible
    const loginPopup = await this.page.waitForEvent('popup');

    // Wait for the login popup to finish loading
    await loginPopup.waitForLoadState();

    // Fill in the username
    await loginPopup.fill(locators.usernameInput, username);

    // Fill in the password
    await loginPopup.fill(locators.passwordInput, password);

    // Click login button
    await loginPopup.click(locators.loginSubmit);

    // Wait for the login to complete
    await this.page.waitForTimeout(5000);
    await loginPopup.close();
    await this.page.reload();

    await actions.verifyElementExists(this.page, locators.logOutBtn, this.workerInfo);
  }


  async addProductToCart() {
    await this.page.locator(locators.addToCartBtn).first().scrollIntoViewIfNeeded();
    await actions.clickFirstElement(this.page, locators.addToCartBtn, this.workerInfo);
    await this.page.waitForTimeout(3000);
    await actions.verifyElementIsEnabled(this.page, locators.sucessMessage, this.workerInfo);
  }

  async goToCart() {
    await actions.clickElement(this.page, locators.miniCart, this.workerInfo);
    await actions.clickElement(this.page, locators.goToCheckout, this.workerInfo);
    // Go to checkout page
    await actions.scrollToElement(this.page, locators.proceedToCheckout, this.workerInfo);

    //Close cookies setting and continue
    await actions.clickFirstElement(this.page, "button[aria-label='閉じる']", this.workerInfo);
    await actions.clickElement(this.page, locators.proceedToCheckout, this.workerInfo);
  }

  async addNewAddress() {
    //add new adds
    await actions.clickElement(this.page, locators.addNewAddress, this.workerInfo);
    await this.page.getByRole('textbox', { name: '姓*' }).fill(data.firstName);
    await this.page.getByRole('textbox', { name: '名*' }).fill(data.lastName);
    await this.page.getByRole('textbox', { name: '会社' }).fill(data.company);
    await this.page.getByPlaceholder('例) 1410021').fill(data.postalCode);

    await this.page.getByRole('textbox', { name: '都道府県' }).fill(data.region);
    await this.page.getByRole('textbox', { name: '住所*' }).fill(data.city);
    await this.page.getByRole('textbox', { name: '住所：行' }).fill(data.street);
    await this.page.getByRole('textbox', { name: '電話番号*' }).fill(data.telephone);
    await this.page.getByRole('textbox', { name: '電話番号の確認（再入力)*' }).fill(data.telephone);
    //save address
    await actions.clickElement(this.page, 'button.action.primary.action-save-address', this.workerInfo)
  }

  async addPayment() {
    await actions.clickElement(this.page, locators.proceedButtonSelector, this.workerInfo);
    // Select payment
    await this.page.getByLabel(locators.paymentMethodSelector).check();
    const paymentIframe = this.page.frameLocator('iframe.sq-card-component');
    await paymentIframe.locator(locators.cardNumberInputSelector).fill(data.cardNumber);
    await paymentIframe.locator(locators.expirationDateInputSelector).fill(data.expiryMonth);
    await paymentIframe.locator(locators.cvvInputSelector).fill(data.cvv);
    await this.page.locator(locators.agreementPaymentCheck).click();
  }

  async placeOrder() {
    await actions.clickElement(this.page, locators.confirmOrderButtonLocator, this.workerInfo)
  }

  async verifyOrderSuccess() {
    await actions.verifyPageTitle(this.page, data.successPageTitle, this.workerInfo)
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
