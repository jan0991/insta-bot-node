require('babel-polyfill');

const _log = (type, message, tag = false) => {
    const tagFormatted = tag ? ` | #${tag} |` : '';
    const date = new Date(Date.now()).toLocaleString();
    let typeFormatted = `[${type}]`.toUpperCase();
    typeFormatted += Array(10 - typeFormatted.length).join(' ');
    console.log(`${date}: ${typeFormatted} -${tagFormatted} ${message}`);
};

export { _log as default };
