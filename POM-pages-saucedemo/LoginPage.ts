import { Page } from '@playwright/test';
import { loginSelectors } from '../fixtures-Saucedemo/selectors';



export class LoginPage {
    page: Page;
    private usernameInput = loginSelectors.usernameInputSelector;
    private passwordInput = loginSelectors.passwordInputSelector;
    private loginButton = loginSelectors.LoginButton;
    private errorMessage = loginSelectors.errorMessageSelector;

    constructor(page: Page) {
        this.page = page;
    }

    async enterUsername(username: string) {
        await this.page.fill(this.usernameInput, username);
    }

    async enterPassword(password: string) {
        await this.page.fill(this.passwordInput, password);
    }

    async clickLoginButton() {
        await this.page.click(this.loginButton);
    }
    async waitForErrorMessage() {
        await this.page.waitForSelector(this.errorMessage, { state: 'visible' });
    }

    async getErrorMessage(): Promise<string> {
        return this.page.textContent(this.errorMessage);
    }
}
