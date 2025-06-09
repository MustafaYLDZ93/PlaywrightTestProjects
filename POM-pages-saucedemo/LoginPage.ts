import { Page } from '@playwright/test';
import { loginSelectors } from '../fixtures-Saucedemo/selectors';



export class LoginPage {
    readonly page: Page;
    readonly usernameInput = loginSelectors.usernameInputSelector;
    readonly passwordInput = loginSelectors.passwordInputSelector;
    readonly loginButton = loginSelectors.LoginButton;
    readonly errorMessage = loginSelectors.errorMessageSelector;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async enterUsername(username: string) {
        await this.page.fill(this.usernameInput, username);
    }

    async enterPassword(password: string) {
        await this.page.fill(this.passwordInput, password);
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async clickLoginButton() {
        await this.page.click(this.loginButton);
    }
    async waitForErrorMessage() {
        await this.page.waitForSelector(this.errorMessage, { state: 'visible' });
    }

    async getErrorMessage() {
        return this.page.textContent(this.errorMessage);
    }
}
