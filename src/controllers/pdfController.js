const PDFService = require('../services/pdfService');
const { getFile, uploadFile } = require('../config/minioConfig');
const { removeFile } = require('../services/fileService');

const findPDF = async (req, res) => {
    const result = await PDFService.findPDF(req.body.keyword);

    if (result.length == 0) {
        return res.status(200).json({
            EC: 1,
            EM: "Don't exist PDF with keyword",
            DT: []
        })
    }

    return res.status(200).json({
        EC: 0,
        EM: "",
        DT: result
    })
}

const viewPDF = async (req, res) => {
    const buffer = await getFile(req.params.fileName);
    let type = req.params.fileName.split('.')[1];
   
    if (type == 'jpg' || type == 'JPG') {
        type = 'image/jpeg'
    }
    else if (type == 'png' || type == 'PNG') {
        type = 'image/png'
    }
    else {
        type = 'application/pdf'
    }
    res.setHeader('Content-Type', type);
    res.status(200).send(buffer);
}

const getAllPDF = async (req, res) => {
    const pdfs = await PDFService.getAllPDF();
    return res.status(200).json({
        EC: 0,
        EM: "",
        DT: pdfs
    })
}


const deletePDF = async (req, res) => {
    const fileName = req.params.fileName
    await PDFService.deletePDF(fileName);
    return res.status(200).json({
        EC: 0,
        EM: "Delete successfully",
        DT: ""
    })
}

const updatePDF = async (req, res) => {
    await PDFService.updatePDF(req.body);
    return res.status(200).json({
        EC: 0,
        EM: "Update successful",
        DT: ""
    });
}

const uploadPdf = async (req, res) => {
    const pdfFile = req.files['pdf'] ? req.files['pdf'][0] : null;
    const imageFile = req.files['image'] ? req.files['image'][0] : null;

    if (!pdfFile || !imageFile) {
        return res.status(400).json({ message: 'No files uploaded' });
    }

    let objectPdf = JSON.parse(req.body.objectPdf)
    await PDFService.insertPDF(objectPdf);
    await uploadFile(pdfFile.originalname);
    await uploadFile(imageFile.originalname);

    removeFile(pdfFile.originalname);
    removeFile(imageFile.originalname);

    return res.status(200).json({
        EC: 0,
        EM: "Upload successful",
        DT: ""
    })
}

const getPDFById = async (req, res) => {
    const pdf = await PDFService.getPDFById(req.params.id);
    return res.status(200).json({
        EC: 0,
        EM: "",
        DT: pdf
    });
}

module.exports = { findPDF, viewPDF, getAllPDF, deletePDF, updatePDF, getPDFById, uploadPdf }