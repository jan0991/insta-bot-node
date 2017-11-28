require('babel-polyfill');

const scrollToBottom = async (page, iterations, iterator = 0) => {
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    iterator++;
    await humanDelay(page);
    if (iterator !== iterations) return scrollToBottom(page, iterations, iterator);
};

const shuffleArray = (arr) => {
    return arr.sort(() => Math.random() * 2 - 1);
};

const probability = (decimal) => {
    if (typeof decimal !== 'number') throw new Error('paramater should be a number');
    if (decimal > 1 || decimal < 0) throw new Error('paramater should be a value between 0 and 1');
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

const randomInArray = (arr) => {
    if (!Array.isArray(arr)) throw new Error('arr paramater should be an array');
    return arr[Math.floor(Math.random()*arr.length)];
};

const trimArray = (arr, limit) => {
    if (!Array.isArray(arr)) throw new Error('arr paramater should be an array');    
    if (typeof limit !== 'number') throw new Error('limit paramater should be a number');    
    if (limit > 200) throw new Error('limit paramater should be below 200');    
    if (arr.length > limit) arr.length = limit;
    return arr;
};

module.exports = {
    scrollToBottom,
    shuffleArray,
    probability,
    humanDelay,
    randomInArray,
    trimArray,
};
