import { test, describe } from '../fixtures';
import * as data from '../data/login.data.json';

describe('Login Page', () => {
    test('Verify login page', async ({ loginPage, commonPage }) => {
        await loginPage.open();
        await loginPage.verifyTitle();
        await loginPage.login(data.email, data.password);
        await loginPage.waitForTimeout(5000);
    });
});
