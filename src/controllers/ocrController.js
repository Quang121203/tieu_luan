const { removeFile } = require('../services/fileService');
const { ocr } = require('../services/ocrService');
const fs = require('fs').promises;

const ocrController = async (req, res) => {
    try {
        req.file = req.body.name;
        const name = req.file.split('.')[0]; 
        const { path, text } = await ocr(req.file);

        const data = await fs.readFile(path);
        const pdf = data.toString('base64');

        removeFile(req.file);
        removeFile(`${name}.pdf`);
        return res.status(200).json({
            EC: 0,
            EM: "agsdghsd",
            DT: {
                pdf,
                text
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: 1,
            EM: "Something went wrong in this PDF",
            DT: ''
        })
    }

}



module.exports =  ocrController 