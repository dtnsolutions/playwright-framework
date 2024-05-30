import type { Page, TestInfo } from '@playwright/test';
import * as actions from '@utils/base/web/actions';
import * as data from '../data/home.data.json';
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

    async verifyTitle() {
        await actions.verifyPageTitle(this.page, data.title, this.workerInfo);
    }

    async waitForTimeout(time: number) {
        await this.page.waitForTimeout(time);
    }

    async login(email: string, password: string) {
        await actions.clickElement(this.page, locators.customerMenu, this.workerInfo)
        await actions.clickElement(this.page, locators.signInAnchor, this.workerInfo)
        await actions.fill(this.page, locators.emailInput, email, this.workerInfo)
        await actions.fillPwd(this.page, locators.password, password, this.workerInfo)
        await actions.pressEnterOnElement(this.page, locators.password, this.workerInfo)
    }
}
