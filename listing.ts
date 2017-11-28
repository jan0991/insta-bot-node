import { scrollToBottom, trimArray } from './helpers';
import config from './config';
import _log from './log';
import post from './post';

const listing = {

    load: async (page: any, tag: string) => {
        await page.goto(`https://www.instagram.com/explore/tags/${tag}/`, { waitUntil: 'networkidle0'});
        _log('Pending', 'Loading posts...', tag);        
        await scrollToBottom(page, 8);
    },

    getUrls: async (page: any, tag: string) => {
        const posts = await page.evaluate(() => {
            const urls: string[] = [];
            const posts = document.querySelectorAll('article > div:last-child > div:first-child > div > div');
            posts.forEach((post) => {
                const link = post.querySelector('a');
                urls.push(link.getAttribute('href'));
            });
            return urls;
        });
        const trimmedPosts = trimArray(posts, config.instagram.bot.postsPerTag);
        _log('Success', `Collected ${trimmedPosts.length} post URLs from page.`, tag);
        return trimmedPosts;
    },

    loopPosts: async(page: any, tag: string, paths: string[]) => {
        const total = paths.length;
        _log('Pending', 'Working through posts...', tag);
        for (const [index, path] of paths.entries()) {
            await post.completeActions(page, path, tag, index, total);
        }
        _log('Success', 'Complete.', tag);
    },
};

export { listing as default };
