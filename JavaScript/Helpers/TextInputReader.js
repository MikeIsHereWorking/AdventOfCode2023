import fs from 'fs';

export default (fileName) => {
    let data = fs.readFileSync(fileName, 'utf-8')

    return data.split('\r\n');
};