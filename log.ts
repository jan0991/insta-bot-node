const _log = (type: string, message: string, tag: any = false) => {
    const tagFormatted = tag ? ` | #${tag} |` : '';
    const date = new Date(Date.now()).toLocaleString();
    let typeFormatted = `[${type}]`.toUpperCase();
    typeFormatted += Array(10 - typeFormatted.length).join(' ');
    console.log(`${date}: ${typeFormatted} -${tagFormatted} ${message}`);
};

export { _log as default };
