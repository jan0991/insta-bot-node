require('babel-polyfill');
import config from './config';
import { probability, humanDelay } from './helpers';
import _log from './log';

const post = {

    load: async (path, page, index, total) => {
        await humanDelay(page); 
        const pageUrl = `https://www.instagram.com${path}`;
        await page.goto(pageUrl, { waitUntil: 'networkidle2'});
        _log('Success', `Post loaded. (${index+1}/${total})`);
    },

    like: async (page) => {
        await humanDelay(page);
        const liked = await page.evaluate(() => {
            const toLike = document.querySelector('.coreSpriteHeartOpen');
            if (toLike === null) return;
            const button = toLike.parentNode;
            button.click();
            return true;
        });
        if (liked) return _log('Success', 'Post liked.');
        _log('Warn', 'Post already liked.');
    },

    comment: async (page) => {
        await humanDelay(page);        
        const willPost = probability(.1);
        if (!willPost) return;
        const comment = config.instagram.bot.comments[3];
        const textarea = await page.$('textarea[aria-label="Add a comment…"]');
        textarea.type(comment);
        _log('Success', 'Comment added to post.');
    },
};

export { post as default };
