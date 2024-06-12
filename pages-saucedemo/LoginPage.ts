import { Page } from '@playwright/test';


export class LoginPage {
    page: Page;
    private usernameInput = '#user-name';
    private passwordInput = '#password';
    private loginButton = '#login-button';
    private errorMessage = '[data-test="error"]';

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
