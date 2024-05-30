import type { Page, TestInfo } from '@playwright/test';
import * as actions from '@utils/base/web/actions';
import * as data from '../data/login.data.json';
import * as locators from '../locators/login.locator';

export default class LoginPage {
    constructor(
        public page: Page,
        public workerInfo: TestInfo,
    ) { }

    async open() {
        await actions.navigateTo(this.page, process.env.URL.concat('/customer/account/login'), this.workerInfo);
        // move the mouse to make sure all the Hyva JS is loaded
        await this.page.mouse.move(0, 1);
    }

    async verifyTitle() {
        await actions.verifyPageTitle(this.page, data.title, this.workerInfo);
    }

    async waitForTimeout(time: number) {
        await this.page.waitForTimeout(time);
    }

    async login(email: string, password: string) {
        await actions.fill(this.page, locators.emailInput, email, this.workerInfo)
        await actions.fillPwd(this.page, locators.password, password, this.workerInfo)
        await actions.pressEnterOnElement(this.page, locators.password, this.workerInfo)
    }

    async navigateTo (url: string) {
        await actions.navigateTo(this.page, url, this.workerInfo)
    }
}
