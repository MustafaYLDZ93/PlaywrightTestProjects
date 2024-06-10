import { Page } from '@playwright/test';


export class LoginPage {
    page: Page;
    usernameInput = '#user-name';
    passwordInput = '#password';
    loginButton = '#login-button';
    errorMessage = '[data-test="error"]';

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

    async getErrorMessage(): Promise<string> {
        return this.page.textContent(this.errorMessage);
    }
}
