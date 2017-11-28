import bot from './bot';
import listing from './listing';
import _log from './log';

(async () => {
    const browser = await bot.start();
    const page = await bot.createPage(browser);
    await bot.login(browser, page);
    await listing.load(page, 'streetfashion');
    const paths = await listing.getUrls(page, 'streetfashion');
    await listing.loopPosts(page, 'streetfashion', paths);
    _log('Success', 'Session complete, closing browser.');
    await browser.close();
})();