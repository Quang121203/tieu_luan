const Minio = require('minio');
const path = require('path');
const fs = require('fs');
const { unlink } = require('node:fs');
const os = require('os');

function getLocalIPAddress() {
    const interfaces = os.networkInterfaces();
    for (let interfaceName in interfaces) {
        for (let iface of interfaces[interfaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address; 
            }
        }
    }
    throw new Error('Không tìm thấy địa chỉ IP nào phù hợp.');
}


const minioClient = new Minio.Client({
    endPoint: getLocalIPAddress(),
    port: 9000,
    useSSL: false,
    accessKey: 'JUUpWCAC7Zc0kLtbBdLI',
    secretKey: "4Wmg2JB84m0RPudDi0bD6F6VFfno4B8veImuPCcy"
});

const bucketName = 'ocr';

const createBuket = () => {
    minioClient.bucketExists(bucketName, function (err, exists) {
        if (err) {
            return console.log('Error checking if bucket exists:', err);
        }

        if (!exists) {
            minioClient.makeBucket(bucketName, 'us-east-1', function (err) {
                if (err) {
                    return console.log('Error creating bucket:', err);
                }
            });
        }
    });
}

const uploadFile = async (file) => {

    const pathToFile = path.join(__dirname, `../../public/files/${file}`);

    const metaData = {
        'Content-Type': 'application/octet-stream',
        'X-Amz-Meta-Testing': 1234,
        example: 5678,
    };

    await minioClient.fPutObject(bucketName, file, pathToFile, metaData, function (err) {
        if (err) {
            return console.log('Error uploading file:', err);
        }
        console.log('File uploaded successfully.');
    });

}

const getFile = async (fileName) => {
    const fileStream = fs.createWriteStream(fileName);
    await new Promise((resolve, reject) => {
        minioClient.getObject(bucketName, fileName, function (err, dataStream) {
            if (err) {
                reject(err);
                console.log('Error getting file:', err);
            } else {
                dataStream.pipe(fileStream);
                fileStream.on('finish', () => {
                    resolve();
                });
                fileStream.on('error', (err) => {
                    reject(err);
                });
            }
        });
    });

    const buffer = fs.readFileSync(fileName);

    unlink(fileName, (err) => {
        if (err) throw err;
    });

    return buffer
}

module.exports = { createBuket, uploadFile, getFile }