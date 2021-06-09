const puppeteer = require(`puppeteer`)
const expect = require(`chai`).expect

describe(`Pruebas con Aserciones`, () => {
	let browser, page
	before(async () => {
	browser = await puppeteer.launch({ headless: false, slowMo: 100 })
	page = await browser.newPage()
	})

	after(async () => {
	await browser.close()
	})
	    it(`Aserciones`, async () =>  {
		
		await page.goto(`http://automationpractice.com/index.php`)
		let prueba = "$14.00"
        
		const texto = await page.$x("//a/span[contains(text(), 'Add to cart')]");
        await texto[0].click();
        await page.waitForTimeout(2000)

        const element = await page.$x('//*[@id="homefeatured"]/li[1]/div/div[2]/div[1]/span');
        const textObject = await element[0].getProperty('textContent');
        const text = textObject._remoteObject.value;
        console.log("Precio fuera del carrito", text)

        const carro = await page.$x("//div/a[@title='View my shopping cart']");
        await carro[0].click();
    
        const carro1 = await page.$x("//a[@title='Check out']");
        await carro1[0].click();
        await page.waitForTimeout(4000)
    
       const total = await page.$x('//*[@id="total_product"]');
       const textObject1 = await total[0].getProperty('textContent');
       const text1 = textObject1._remoteObject.value;
       console.log("Precio dentro del carrito",text1)
		//console.log("soy prueba", prueba)
		expect(text).to.be.a("string", text1)
       //expect(text).to.be.a("string", prueba)

		await page.waitForTimeout(2000)
        
	
	})

	

})