import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, webkit, firefox, Page, Browser, BrowserContext, expect } from '@playwright/test'; 
import { setDefaultTimeout } from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { LoginPage } from '../pageObjects/loginPage';
import dotenv from 'dotenv';

dotenv.config();
setDefaultTimeout(10000);

Given('el usuario se encuentre en la página de login de SauceDemo', async function () {
  await pageFixture.page.goto(process.env.URL);
  await pageFixture.page.waitForLoadState('networkidle');
});

When('ingresa un nombre de usuario válido y una contraseña válida', async function () {
  const credentials=new LoginPage(pageFixture.page);
  await credentials.fillUsername('standard_user');
  await credentials.fillPassword('secret_sauce');
});

When('hace clic en el botón Login', async function () {
  const clickbtnLogin=new LoginPage(pageFixture.page);
  await clickbtnLogin.clickLoginButton();
});

Then('debe ser redirigido a la página de productos', async function () {
  const headerSauceDemo = pageFixture.page.locator('#header_container');
  await expect(headerSauceDemo).toBeVisible({ timeout: 10000 });
});

When('ingresa un nombre de usuario inválido o una contraseña inválida', async function () {
  const credentials=new LoginPage(pageFixture.page);
  await credentials.fillUsername('locked_out_user');
  await credentials.fillPassword('secret_sauce');
});

Then('debe visualizar un mensaje que informe que las credenciales no son válidas', async function () {
  const alertIncorrect=new LoginPage(pageFixture.page);
  await alertIncorrect.alertincorrectCredential();
});