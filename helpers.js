require('babel-polyfill');

const scrollToBottom = async (page, iterations, iterator = 0) => {
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    iterator++;
    await humanDelay(page);
    if (iterator !== iterations) return scrollToBottom(page, iterations, iterator);
};

const probability = (decimal) => {
    const number = Math.random();
    if (number > decimal) return false;
    return true;
};

const humanDelay = async (page) => {
    const min = 2000;
    const max = 5000;
    const delay = Math.floor(Math.random() * (max - min+1) + min);
    await page.waitFor(delay);
};

module.exports = {
    scrollToBottom,
    probability,
    humanDelay
};
