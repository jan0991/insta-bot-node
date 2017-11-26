require('babel-polyfill');
const puppeteer = require('puppeteer');
import config from './config';

const _log = (type, message) => {
    const date = new Date(Date.now()).toLocaleString();
    console.log(`${date}: [${type.toUpperCase()}] - ${message}`);
};

const createPage = async (browser) => {
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
}

const login = async (page) => {
    await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle0'});
    const username = await page.$('input[name="username"]');
    const password = await page.$('input[type="password"]');
    const button = await page.$('form button');
    await username.type(config.instagram.bot.user, {delay: 45});
    await password.type(config.instagram.bot.pass, {delay: 45});
    await button.click();
    await page.waitForNavigation({ waitUntil: 'networkidle2'});
    const samePage = await page.$('input[name="username"]'); 
    if (samePage) return false;
    _log('Success', 'Logged in to Instagram.');
    return true;
};

const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const scrollToBottom = async (page, iterations, iterator = 0) => {
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    iterator++;
    await timeout(5000);
    if (iterator !== iterations) return scrollToBottom(page, iterations, iterator);
};

const loadTagContent = async (page, tag) => {
    await page.goto(`https://www.instagram.com/explore/tags/${tag}/`, { waitUntil: 'networkidle0'});
    await scrollToBottom(page, 5);
};

const collectUrls = async (page) => {
    _log('Warn', 'Collecting URLs from page...')
    const posts = await page.evaluate(() => {
        const urls = [];
        const posts = document.querySelectorAll('article > div:last-child > div:first-child > div > div');
        posts.forEach((post) => {
            const link = post.querySelector('a');
            urls.push(link.getAttribute('href'));
        });
        return urls;
    });

    return posts;
};

const loadPost = async (paths, page) => {
    _log('Warn', 'Loading post...');
    const pageUrl = `https://www.instagram.com${paths[1]}`;
    await page.goto(pageUrl, { waitUntil: 'networkidle0'});
};

const likePost = async (page) => {
    const liked = await page.evaluate(() => {
        const toLike = document.querySelector('.coreSpriteHeartOpen');
        if (toLike === null) return;
        const button = toLike.parentNode;
        button.click();
        return true;
    });
    if (liked) return _log('Success', 'Post liked.');
    _log('Warn', 'Post already liked.');
};

const writeComment = async (page) => {
    const comment = config.instagram.bot.comments[3];
    const textarea = page.$('textarea[aria-label="Add a comment…"]');
    textarea.focus();
//     await page.evaluate((comment) => {
//         const textarea = document.querySelector('textarea[aria-label="Add a comment…"]');
//         textarea.focus();
//         textarea.value = comment;
//         console.log(comment);
//     }, comment);
//     _log('Success', 'Comment added to post.');
// };

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await createPage(browser);
    const loggedIn = await login(page);
    if (!loggedIn) {
        _log('Error', 'Unable to log in to Instagram. Please check credentials/network connection');
        return browser.close();
    }
    await loadTagContent(page, 'mensfashion');
    const paths = await collectUrls(page);
    await loadPost(paths, page);
    await likePost(page);
    await writeComment(page);
    // await browser.close();
})();