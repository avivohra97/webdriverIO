import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "chai";
import logger from "../../helper/logger";
import reporter from "../../helper/reporter";
import constants from "../../../data/constants.json" assert { type: "json" };
import apiHelper from "../../helper/apiHelper";
import noncommerceHomePage from "../../page-objects/commerce.home.page";
import nopCommerceCustlistPage from "../../page-objects/commerce.custlist.page";
import fs from "fs";
import { log } from "console";


/**
 * Get list of users from reqres api
 * Sub-steps:
 * 1. Get payload data
 * 2. Make get call by using API helper
 * 3. Store results
 */
Given(/^Get list of (.*) from reqres.in$/, async function (endpointRef) {
    if (!endpointRef)
        throw Error(`Invalid endpoint reference provided: ${endpointRef}`);
    // Get payload data
    let reqData = {};
    let res;
    try {

        let endpoint = '';
        reporter.addStep("info", `Getting payload data from reqres.in: ${endpointRef}`, true);
        if (endpointRef.trim().toUpperCase() === "USERS") {
            endpoint = constants.REQRES.GET_USERS;
        }
        if (!endpoint)
            throw Error(`Invalid endpoint reference provided: ${endpointRef}`);
        // Make get call by using API helper

        await browser.call(async () => {
            // @ts-ignore
            res = await apiHelper.GET(browser.options.reqresBaseUrl, endpoint, "", constants.REQRES.QUERY_PARAM)
        });
        if (res.status != 200) expect.fail(`Failed to get list of users from reqres.in: ${res.status} - ${res.statusText} from endpoint: ${endpoint}`);
        reporter.addStep("info", `Successfully got list of users from reqres.in: ${JSON.stringify(res.body)}`, true);
        // Store results
        let data = JSON.stringify(res.body);
        let filename = `${process.cwd()}/data/api-res/reqresAPIUsers.json`
        fs.writeFileSync(filename, data, undefined);
        reporter.addStep("info", `API response from ${endpoint} stored in json file`, true)
        reqData = JSON.parse(JSON.stringify(res)).req;
    } catch (error) {
        logger.error(`Error while getting list of users from reqres.in: ${error.message}`);
        throw error;
    }
});

When(/^An as (.*) user login to nopcommerce site$/, async (user) => {
    if(!user) throw Error(`Invalid user provided: ${user}`);
    try{
        reporter.addStep("info", `Logging in as user: ${user}`, true);
        // @ts-ignore
        await noncommerceHomePage.loginTonopCommerceWeb(browser.options.commerceBaseUrl,process.env.COMMERCE_USERNAME, process.env.COMMERCE_PASSWORD);
        reporter.addStep("info", `Successfully logged in as user: ${user}`, true);
        
    } catch (error) {
        logger.error(`Error while logging in as user: ${user} - ${error.message}`);
        throw error;    
    }
});

/**
 * Verify if given user exists in customers list
 * Sub-steps:
 * 1. Navigate/select Customer options from left menu
 * 2. Read API response from /data folder
 * 3. For each user object in API response
 *  - Enter first name and last name 
 *  - Search and confirm if user exists
 * 4. In case user does not exist write it to error file
 */
Then(/^Verify if all users exist in customers list$/, async function () {

    try {
        /**1. Navigate/select Customer options from left menu*/
        await browser.pause(20000);
        // @ts-ignore
        
        await browser.url(`${browser.options.commerceCustomerUrl}/Admin/Customer/List`)
        reporter.addStep( "info", `Navigated to customer list screen...`)

        /** 2. Read API response from /data folder*/
        let filename = `${process.cwd()}/data/api-res/reqresAPIUsers.json`
        let data = fs.readFileSync(filename, "utf8")
        let dataObj = JSON.parse(data)

        /**3. For each user object in API response */
        let numOfObj = dataObj.data.length
        let arr = []
        for (let i = 0; i < numOfObj; i++) {
            let obj = {}
            let firstname = dataObj.data[i].first_name
            let lastname = dataObj.data[i].last_name
            let custNotFound = await nopCommerceCustlistPage.searchNameAndConfirm( firstname, lastname)
            if (custNotFound) {
                obj["firstname"] = firstname
                obj["lastname"] = lastname
                arr.push(obj)
            }
        }

        /**4. In case user does not exist write it to error file*/
        if (arr.length > 1) {
            let data = JSON.stringify(arr, undefined, 4)
            let filepath = `${process.cwd()}/results/custNotFoundList.json`
            fs.writeFileSync(filepath, data)
        }
    } catch (err) {
        err.message = `${this.testid}: Failed at checking users in nopcommerce site, ${err.message}`
        throw err
    }

});