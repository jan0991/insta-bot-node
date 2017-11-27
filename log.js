require('babel-polyfill');

const _log = (type, message) => {
    const date = new Date(Date.now()).toLocaleString();
    let typeFormatted = `[${type}]`.toUpperCase();
    typeFormatted += Array(10 - typeFormatted.length).join(' ');
    console.log(`${date}: ${typeFormatted} - ${message}`);
};

export { _log as default };
