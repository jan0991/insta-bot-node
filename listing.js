require('babel-polyfill');
import { scrollToBottom, humanDelay } from './helpers';
import _log from './log';
import post from './post';

const listing = {

    load: async (page, tag) => {
        await page.goto(`https://www.instagram.com/explore/tags/${tag}/`, { waitUntil: 'networkidle0'});
        _log('Success', `Loaded posts with #${tag} tag`);        
        await scrollToBottom(page, 5);
        _log('Success', `Loaded more posts.`);
    },

    getUrls: async (page) => {
        const posts = await page.evaluate(() => {
            const urls = [];
            const posts = document.querySelectorAll('article > div:last-child > div:first-child > div > div');
            posts.forEach((post) => {
                const link = post.querySelector('a');
                urls.push(link.getAttribute('href'));
            });
            return urls;
        });
        _log('Success', 'Collected URLs from page...')
        return posts;
    },

    loopPosts: async(page, tag, paths) => {
        const total = paths.length;
        _log('Pending', `Loading posts from tag #${tag}`);
        for (const [index, path] of paths.entries()) {
            await post.load(path, page, index, total);
            await post.like(page);
            // await post.comment(page);
        }
    },
};

export { listing as default };
