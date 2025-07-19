import { Given,When,Then } from "@wdio/cucumber-framework";
import { remote } from 'webdriverio'
import { expect } from '@wdio/globals'
import logger from '../../helper/logger';
import { log } from "winston";

const browser = await remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: process.env.CI ? ['headless', 'disable-gpu'] : []
        }
    }
});


Given(/^I open the page$/, async () => {
    await browser.url("https://rahulshettyacademy.com/AutomationPractice/");
    logger.info("Page opened successfully");
});


Then(/^I click on the radio button$/, async () => {
    const firstLink = browser.$("//input[@value='radio2']");
    await firstLink.click();
    logger.info("Radio button clicked successfully");
});

// Then(/^I type "([^"]*)" in the suggestion input$/, async (expectedTitle: string) => {
//     await browser.$(`#dropdown-class-example`).selectByVisibleText("Option1");
// });

Then(/^I select an option$/, async () => {
    await browser.$(`#dropdown-class-example`).selectByVisibleText("Option1");
    await browser.deleteSession();
    logger.info("Option selected successfully");
});