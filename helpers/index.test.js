const {
    // scrollToBottom,
    // shuffleArray,
    probability,
    // humanDelay,
    randomInArray,
    trimArray,
} = require('./index');

const fn = function() {}; 

describe('probability(Number)', () => {

    describe('given an invalid parameter', () => {

        it('will throw an error if number is more than 1', () => {
            expect(() => probability(1.1)).toThrow();
        });

        it('will throw an error if number is less than 0', () => {
            expect(() => probability(-0.1)).toThrow();
        });

        it('will throw an error if parameter isn\'t a number', () => {
            expect(() => probability('foo')).toThrow();
            expect(() => probability(fn)).toThrow();
            expect(() => probability(1e5)).toThrow();
        });
    });

    describe('given a valid number', () => {

        it('will return a boolean', () => {
            expect(typeof probability(Math.random()) === 'boolean').toBe(true);
        });
        
        it('will return true if probability is 1', () => {
            expect(probability(1)).toBe(true);
        });

        it('will return false if probability is 0', () => {
            expect(probability(0)).toBe(false);
        });
    });
});

describe('randomInArray(arr)', () => {

    describe('given an invalid parameter', () => {

        it('will throw an error if \'arr\' param is not an array', () => {
            expect(() => trimArray('foo', 1)).toThrow();
            expect(() => trimArray(fn, 1)).toThrow();
            expect(() => trimArray(1e5, 1)).toThrow();
        });        
    });

    describe('given a valid parameter', () => {
        const arr = ['foo', 'bar', 'baz'];

        it('will return a random entry from the array', () => {
            expect(() => {
                const item = randomInArray(arr);
                return arr.indexOf(item);
            }).not.toBe(-1);
        });        
    });
});

describe('trimArray(arr, limit)', () => {

    describe('given an invalid paramater', () => {

        it('will throw an error if \'arr\' param is not an array', () => {
            expect(() => trimArray('foo', 1)).toThrow();
            expect(() => trimArray(fn, 1)).toThrow();
            expect(() => trimArray(1e5, 1)).toThrow();
        });

        it('will throw an error if \'limit\' param not a number', () => {           
            expect(() => trimArray([1,2], 'foo')).toThrow();
            expect(() => trimArray([1,2], fn)).toThrow();
        });

        it('will throw an error if \'limit\' param is not below 200', () => {           
            expect(() => trimArray([1,2], 201)).toThrow();
            expect(() => trimArray([1,2], 1e5)).toThrow();
        });
    });

    describe('given valid paramaters', () => {
        it('will return the array unchanged if \'limit\' is larger than array length', () => {
            const arr = Array(5).fill(null);
            const newArr = trimArray(arr.slice(), 6);
            expect(arr).toEqual(newArr);
        });

        it('will return the array unchanged if \'limit\' is equal to array length', () => {
            const arr = Array(5).fill(null);
            const newArr = trimArray(arr.slice(), 5);
            expect(newArr.length === 5).toBe(true);
        });

        it('will return the array trimed if \'limit\' is smaller than array length', () => {
            const arr = Array(5).fill(null);
            const newArr = trimArray(arr.slice(), 4);
            expect(newArr.length === 4).toBe(true);
        });
    });
});