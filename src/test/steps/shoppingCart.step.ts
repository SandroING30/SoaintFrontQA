import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, webkit, firefox, Page, Browser, BrowserContext, expect } from '@playwright/test'; 
import { setDefaultTimeout } from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { LoginPage } from '../pageObjects/loginPage';
import { Products } from '../pageObjects/appPage';
import dotenv from 'dotenv';

dotenv.config();
setDefaultTimeout(30000);

Given('el usuario ha iniciado sesión correctamente en SauceDemo', async function () {
  await pageFixture.page.goto(process.env.URL);
  const loginPage=new LoginPage(pageFixture.page);
  await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
});

When('hace clic en el botón Add to cart de un producto', async function () {
  const clickbtnLogin=new Products(pageFixture.page);
  this.selectedProduct = await clickbtnLogin.clickRandomProduct();
});

Then('el ícono del carrito debe mostrar la cantidad de productos actualizada', async function () {
  const productsPage = new Products(pageFixture.page);
  await productsPage.verifyCountItem();
});

When('hace clic en el ícono del carrito', async function () {
  const btnCart=new Products(pageFixture.page);
  await btnCart.clickOnCart();
});


Then('debe visualizar el producto seleccionado con su nombre, descripción y precio', async function () {
  const productsPage = new Products(pageFixture.page);
  const { name, description, price } = this.selectedProduct;
  await productsPage.verifyProductInCart(name, description, price);
});

When('hace clic en el botón Checkout', async function () {
  await pageFixture.page.getByRole('button', {name: 'Checkout'}).click()
});

When('completa el formulario con su información personal', async function () {
  const fillForm=new Products(pageFixture.page);
  await fillForm.fillCheckoutForm('Sandro', 'Huamán Mendoza', '1234567');
});

When('hace clic en el botón Continue', async function () {
  const btn=new Products(pageFixture.page);
  await btn.clickOnContinue();
});
  
  When('hace clic en el botón Finish', async function () {
  const btn=new Products(pageFixture.page);
   await btn.clickOnFinish();
});
  
Then('debe mostrarse un mensaje de confirmación Thank you for your order!', async function () {
  const registerSuccessful=new Products(pageFixture.page);
  await registerSuccessful.orderSuccessful();
});