require('babel-polyfill');
import puppeteer from 'puppeteer';
import config from './config';
import _log from './log';

const bot = {

    start: async () => {
        const browser = await puppeteer.launch({
            headless: false,
        });
        return browser;
    },
    
    createPage: async (browser) => {
        const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.59 Safari/537.36';
        const page = await browser.newPage();    
        await page.setUserAgent(userAgent);
        await page.setViewport({
            width: 1280,
            height: 1024,
            deviceScaleFactor: 1
        });
        _log('Success', 'Browser running, page created.');
        return page;
    },

    login: async (browser, page) => {
        await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle0'});
        const username = await page.$('input[name="username"]');
        const password = await page.$('input[type="password"]');
        const button = await page.$('form button');
        await username.type(config.instagram.bot.user, {delay: 45});
        await password.type(config.instagram.bot.pass, {delay: 45});
        await button.click();
        await page.waitForNavigation({ waitUntil: 'networkidle2'});
        const samePage = await page.$('input[name="username"]'); 
        if (samePage) {
            _log('Error', 'Unable to log in to Instagram. Please check credentials/network connection');
            return browser.close();
        }
        _log('Success', 'Logged in to Instagram.');
    },
};

export { bot as default };
