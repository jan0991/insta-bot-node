require('babel-polyfill');
import bot from './bot';
import listing from './listing';
import post from './post';

(async () => {
    const browser = await bot.start();
    const page = await bot.createPage(browser);
    await bot.login(browser, page);
    await listing.load(page, 'mensfashion');
    const paths = await listing.getUrls(page);
    await listing.loopPosts(page, 'mensfashion', paths);
    _log('Success', 'Session complete, closing browser.');
    await browser.close();
})();