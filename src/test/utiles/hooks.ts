import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { After, Before } from "@cucumber/cucumber";
import { pageFixture } from "./pageFixture";

let browser:Browser;
let context:BrowserContext;
let page:Page;

Before(async function(){
    browser = await chromium.launch({
        headless: false, // FALSE: ABRE EL NAVEGADOR Y MUESTRA LA AUTOMATIZACIÓN, TRUE: NO ABRE EL NAVEGADOR
        //channel: 'msedge' // Especifica que usaremos Microsoft Edge o el que deseemos
    });
    context = await browser.newContext()
    page = await context.newPage()
    pageFixture.page = await page;
    page.setViewportSize({
        width: 1500, //DEFINE EL ANCHO DEL NAVEGADOR 
        height: 700, //DEFINE EL LARGO DEL NAVEGADOR 
    });
})

After(async function ({pickle}) {
    const img = await pageFixture.page.screenshot({path: `screenshots/${pickle.name}.png`, fullPage: true });
    await this.attach(img, 'image/png');
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.close();
})

