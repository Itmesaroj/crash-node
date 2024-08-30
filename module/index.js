
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const os = require('os');

function encryptString(text) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    console.log('Encrypted:', encrypted);
    console.log('Key:', key.toString('hex'));
    console.log('IV:', iv.toString('hex'));
}

function generateUUID() {
    console.log('Generated UUID:', uuidv4());
}


function readWithStream(filePath) {
    const start = Date.now();
    let fileData = ''; 

    const stream = fs.createReadStream(filePath, { encoding: 'utf8' });

    stream.on('data', (chunk) => {
        fileData += chunk;  
    });

    stream.on('end', () => {
        const end = Date.now();
        console.log(`Stream read time: ${end - start}ms`);
        console.log('File content length:', fileData.length);
    });

    stream.on('error', (err) => {
        console.error('Stream error:', err);
    });
}

function readWithFs(filePath) {
    const start = Date.now();
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('FS read error:', err);
            return;
        }
        const end = Date.now();
        console.log(`FS read time: ${end - start}ms`);
        console.log('File content length:', data.length);  
    });
}


function printSystemDetails() {
    console.log('System Architecture:', os.arch());
    console.log('CPU Info:', os.cpus());
    console.log('Free Memory:', os.freemem());
    console.log('Total Memory:', os.totalmem());
    console.log('Uptime:', os.uptime());
    console.log('Network Interfaces:', os.networkInterfaces());
}


const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'encrypt':
        const text = args[1] || 'Hello, Good Morning';
        encryptString(text);
        break;
    case 'uuid':
        generateUUID();
        break;
    case 'stream':
        const filePathStream = args[1];
        if (!filePathStream) {
            console.log('Please provide a file path for stream reading');
        } else {
            readWithStream(filePathStream);
        }
        break;
    case 'fs':
        const filePathFs = args[1];
        if (!filePathFs) {
            console.log('Please provide a file path for FS reading');
        } else {
            readWithFs(filePathFs);
        }
        break;
    case 'os':
        printSystemDetails();
        break;
    default:
        console.log('Invalid command. Use "encrypt", "uuid", "stream", "fs", or "os"');
        break;
}
