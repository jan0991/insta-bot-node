import config from './config';
import { probability, humanDelay, randomInArray } from './helpers';
import _log from './log';

const post = {

    completeActions: async (page: any, path: string, tag: string, index: number, total: number) => {
        await post.load(page, path, tag, index, total);
        const unavailable = await post.checkAvailability(page);
        if (unavailable) return _log('Error', 'Page unavailable. Skipping...', tag);
        await post.like(page, tag);
        await post.comment(page, tag);
        await post.follow(page, tag);
    },

    load: async (page: any, path: string, tag: string, index: number, total: number) => {
        await humanDelay(page); 
        const pageUrl = `https://www.instagram.com${path}`;
        await page.goto(pageUrl, { waitUntil: 'networkidle2'});
        _log('Success', `Post loaded. (${index+1}/${total})`, tag);
    },

    checkAvailability: async (page: any) => {
        const error = await page.$('.main .error-container');
        if (error) return true;
    },

    like: async (page: any, tag: string) => {
        await humanDelay(page);
        const liked = await page.evaluate(() => {
            const toLike = document.querySelector('.coreSpriteHeartOpen');
            if (toLike === null) return;
            const button = <HTMLAnchorElement>toLike.parentNode;
            button.click();
            return true;
        });
        if (liked) return _log('Success', 'Post liked.', tag);
        _log('Warn', 'Post already liked.', tag);
    },

    comment: async (page: any, tag: string) => {
        const willPost = probability(1/config.instagram.bot.commentFrequency);
        if (!willPost) return;
        await humanDelay(page);        
        const comment = randomInArray(config.instagram.bot.comments);
        const textarea = await page.$('textarea[aria-label="Add a comment…"]');
        await textarea.type(comment, {delay: 45});
        await textarea.press('Enter');
        _log('Success', 'Comment added to post.', tag);
    },

    follow: async (page: any, tag: string) => {
        const willFollow = probability(1/config.instagram.bot.followFrequency);
        if (!willFollow) return;
        await humanDelay(page);
        const followText = await page.$eval('header button', (el: HTMLElement) => el.innerHTML);
        if (followText === 'Following') return _log('Warn', 'Profile already followed.', tag);
        const button = await page.$('header button');
        button.click();
        _log('Success', 'Profile followed.', tag);
    },
};

export { post as default };
