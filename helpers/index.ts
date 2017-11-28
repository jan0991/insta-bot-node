export const scrollToBottom = async (page: any, iterations: number, iterator: number = 0): Promise<void> => {
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    iterator++;
    await humanDelay(page);
    if (iterator !== iterations) return scrollToBottom(page, iterations, iterator);
};

export const shuffleArray = (arr: string[]) => {
    return arr.sort(() => Math.random() * 2 - 1);
};

export const probability = (decimal: number) => {
    if (typeof decimal !== 'number') throw new Error('paramater should be a number');
    if (decimal > 1 || decimal < 0) throw new Error('paramater should be a value between 0 and 1');
    const number = Math.random();
    if (number > decimal) return false;
    return true;
};

export const humanDelay = async (page: any) => {
    const min = 2000;
    const max = 5000;
    const delay = Math.floor(Math.random() * (max - min+1) + min);
    await page.waitFor(delay);
};

export const randomInArray = (arr: string[]) => {
    if (!Array.isArray(arr)) throw new Error('arr paramater should be an array');
    return arr[Math.floor(Math.random()*arr.length)];
};

export const trimArray = (arr: string[], limit: number) => {
    if (!Array.isArray(arr)) throw new Error('arr paramater should be an array');    
    if (typeof limit !== 'number') throw new Error('limit paramater should be a number');    
    if (limit > 200) throw new Error('limit paramater should be below 200');    
    if (arr.length > limit) arr.length = limit;
    return arr;
};