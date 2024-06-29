const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {

    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    //test1
    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const fromField = await $('#from');
        await fromField.setValue('East 2nd Street, 601');
        const toField = await $('#to');
        await toField.setValue('1300 1st St');
        await expect(fromField).toHaveValue('East 2nd Street, 601');
        await expect(toField).toHaveValue('1300 1st St');
    })

    //test 2
it('should select the Supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const callATaxiButton= await $('page.callATaxiButton'); 
        const supportivePlanOption = await $(page.supportivePlanButton);
        await supportivePlanOption.waitForDisplayed();
        await supportivePlanOption.click();
        await expect(supportivePlanOption).toBeDisplayed();
    })

    //test 3 
    it('should fill in the phone number field', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = '+1234567890';
        await page.fillPhoneNumber(phoneNumber);
        const phoneNumberField = await $(page.phoneNumberField);
        const phoneNumberValue = await phoneNumberField.getValue();
        await expect(phoneNumberValue).toEqual(phoneNumber);
    })

    //test 4
    it('should add a credit card', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const cardNumberInput = $('#cardNumber');
        cardNumberInput.setValue('4111111111111111');
        const expirationInput = $('#expiration');
        expirationInput.setValue('12/24');
        const cvvInput = $('#cvv');
        cvvInput.setValue('123');
        const linkButton = $('#linkButton'); 
        expect(linkButton).toBeEnabled();
    })

    //test 5
    it('should write a message', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const messageForDriverField = await $(page.messageForDriverField);
        await messageForDriverField.waitForDisplayed();
        await messageForDriverField.setValue('Hey!');
        const messageValue = await messageForDriverField.getValue();
        await expect(messageValue).toBe('Hey!');
    })

    //test 6
    it('should order two ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlan = await $(page.supportivePlanButton);
        await supportivePlan.click();
        await supportivePlan.click();
        const plusOneIceCreamButton = await $(page.plusOneIceCreamPlusButton);
        await plusOneIceCreamButton.click();
        await plusOneIceCreamButton.click();
        const iceCreamValue = $(page.iceCreamValue);
        const value = await iceCreamValue.getText();
        await expect(parseInt(value)).toBe(2);
    })
    
    //test7
    it('should order a blanket and a handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        const blanketAndHandkerchiefsButton = await $(page.blanketAndHandkerchiefsButton);
        await blanketAndHandkerchiefsButton.click();
        await browser.pause(2000)
        const isChecked = await $(page.blanketSwitch).isSelected();
        await expect(isChecked).toBe(true);
    })

    // test 8
     it('should open the car search modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        const cardNumberInput = $('4111111111111111');
        const cvvInput = $('123');
        await browser.pause(1000);
        const orderButton = await $(page.orderButton);
        await orderButton.waitForClickable({ timeout: 15000 });
        await orderButton.click();
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeExisting();
    })
    
    //test 9
    it('should bring up the driver info', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const orderButton = await $(page.orderButton);
        await orderButton.waitForDisplayed();
        const messageForDriverField = await $(page.messageForDriverField);
        await messageForDriverField.waitForDisplayed();
        await messageForDriverField.setValue('Hey!');
        await orderButton.click();
        await expect($(page.carSearchModal)).toBeExisting();
        const driverInfoModal = $ (page.driverInfoModal);
        await driverInfoModal.waitForDisplayed();
        const driverInfoModalDetailButton = $(page.driverInfoModal);
        await driverInfoModalDetailButton.click();
        await browser.pause(2000)
        await expect(driverInfoModal).toBeDisplayed();
    })

})

