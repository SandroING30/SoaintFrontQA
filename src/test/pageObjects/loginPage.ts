import { expect, Locator, Page } from "@playwright/test";
import { pageFixture } from "../utiles/pageFixture";

export class LoginPage{

    private readonly usernameTextbox: Locator; 
    private readonly passwordTextbox: Locator;
    private readonly loginButton    : Locator;
    private readonly incorrectCredentialsAlert : Locator; 

    constructor(page: Page){
        this.usernameTextbox           = pageFixture.page.locator('#user-name'   );
        this.passwordTextbox           = pageFixture.page.locator('#password'    );
        this.loginButton               = pageFixture.page.locator('#login-button'); 
        this.incorrectCredentialsAlert = pageFixture.page.locator("//div[@class='error-message-container error']");
    }

    async fillUsername(username:string){
        await this.usernameTextbox.fill(username);
    }

    async fillPassword(password:string){
        await this.passwordTextbox.fill(password);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }

    async loginWithCredentials(username: string, password: string){
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    async alertincorrectCredential(){
        await expect(this.incorrectCredentialsAlert).toBeVisible({ timeout: 10000 });
    }
}