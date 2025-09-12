import { expect, Locator, Page } from '@playwright/test';

    export class Products {

        private readonly page: Page;
        private readonly itemsContainer: Locator;
        private readonly itemName: Locator;
        private readonly itemDescription: Locator;
        private readonly itemPrice: Locator;
        private readonly btnaddToCart: Locator;
        private readonly btnCart: Locator; 
        private readonly countItems: Locator;
        private readonly cartItem: Locator;
        private readonly firsNameTextbox: Locator;
        private readonly lastNameTextbox: Locator;
        private readonly postalCodeTexbox: Locator;
        private readonly btnContinue: Locator;
        private readonly btnFinish: Locator;
        private readonly orderSuccessTitle: Locator;


        constructor(page: Page) {
        this.page = page;
        this.itemsContainer   = page.locator('#inventory_container .inventory_item');
        this.itemName         = page.locator('.inventory_item_name');
        this.itemDescription  = page.locator('.inventory_item_desc');
        this.itemPrice        = page.locator('.inventory_item_price');
        this.btnaddToCart     = page.locator('button:has-text("Add to cart")');
        this.btnCart          = page.locator('a.shopping_cart_link');
        this.countItems       = page.locator('.shopping_cart_badge');
        this.cartItem         = page.locator('.cart_item');
        this.firsNameTextbox  = page.getByRole('textbox', {name:'First Name'});
        this.lastNameTextbox  = page.getByRole('textbox', {name:'Last Name'});
        this.postalCodeTexbox = page.getByRole('textbox', {name:'Zip/Postal Code'});
        this.btnContinue      = page.getByRole('button', {name:'Continue'});
        this.btnFinish        = page.getByRole('button', {name:'Finish'});
        this.orderSuccessTitle= page.getByRole('heading', {name: 'Thank you for your order!'});
    }

    async fillFirstName(firstName:string){
        await this.firsNameTextbox.fill(firstName);
    }

    async fillLastName(lastName:string){
        await this.lastNameTextbox.fill(lastName);
    }

    async fillPostalCode(postalCode:string){
        await this.postalCodeTexbox.fill(postalCode);
    }

    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillPostalCode(postalCode);
    }

    async clickRandomProduct() {
        const totalItems = await this.itemsContainer.count();
        const index = Math.floor(Math.random() * totalItems);
        const item = this.itemsContainer.nth(index);
        const name = await item.locator(this.itemName).innerText();
        const description = await item.locator(this.itemDescription).innerText();
        const price = await item.locator(this.itemPrice).innerText();
        console.log(`✅ Agregado al carrito -> Nombre: ${name} | Precio: ${price} | Descripción: ${description}`);
        await item.locator(this.btnaddToCart).click();
        return { name, description, price };
    }

    async clickOnCart(){
        await this.btnCart.click();
    }

    async clickOnContinue(){
        expect(this.btnContinue).toBeVisible();
        await this.btnContinue.click();
    }

    async clickOnFinish(){
        expect(this.btnFinish).toBeVisible();
        await this.btnFinish.click();
    }

    async verifyCountItem() {
        const cartIconBadge = this.countItems; 
        await cartIconBadge.waitFor({ state: 'visible' });   
        const cartCountText = await cartIconBadge.innerText(); 
        const cartCount = parseInt(cartCountText);
        expect(cartCount).toBeGreaterThanOrEqual(1);
        console.log(`🛒 El carrito muestra: ${cartCount} producto seleccionado`);
    }

    async verifyProductInCart(expectedName: string, expectedDescription: string, expectedPrice: string, ) {
        await this.cartItem.waitFor({ state: 'visible' });
        const actualName = await this.itemName.innerText();
        expect(actualName).toBe(expectedName);

        const actualDescription = await this.itemDescription.innerText();
        expect(actualDescription).toBe(expectedDescription);
    
        const actualPrice = await this.itemPrice.innerText();
        expect(actualPrice).toBe(expectedPrice);
    
        console.log(`🛒 Validado en el carrito -> Nombre: ${actualName} | Precio: ${actualPrice} | Descripción: ${actualDescription}`);    
    }

    async orderSuccessful(){
        await expect(this.orderSuccessTitle).toBeVisible({ timeout: 10000 });
    }
}

