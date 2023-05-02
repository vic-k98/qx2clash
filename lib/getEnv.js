function getEnv (key) {
    const argv = process.argv;
    const keyItemStr = argv.find(i => i.indexOf(key) >= 0);
    if (!keyItemStr) return;
    const keyItemArr = keyItemStr.split('=');
    return keyItemArr[1];
}

module.exports = {
    getEnv
}