const { createWorker } = require('tesseract.js');
const { readFile } = require('../services/fileService');
const path = require('path');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs').promises;
const fontkit = require('@pdf-lib/fontkit');

const createWorkerInstance = async (image) => {
    const worker = await createWorker('vie', 1);
    
    await worker.setParameters({
        preserve_interword_spaces: '1',
        tessedit_char_whitelist: 'ABCDEFGHIKLMNOPQRSTUVXYabcdefghiklmnopqrstuvxyÀÁẠẢĂÂẦẤẬẨẪĂẰẮẶẲẴàáạảãâầấậẩẫăằắặẳẵÈÉẸẺẼÊỀẾỆỂỄèéẹẻẽêềếệểễÒÓỌỎÕỒỐỘỔỖƠỜỚỢỞỠòóọỏõôồốộổỗơờớợởỡÙÚỤỦŨƯỪỨỰỬỮùúụủũưừứựửữỲÝỴỶỳýỵỷỹĨÍỊỈìíịỉĩĐđ0123456789 \s', // Chỉ nhận diện các ký tự tiếng Việt
    });

    const ret = await worker.recognize(readFile(image));

    const blocks = ret.data.blocks.sort((a, b) => a.bbox.y - b.bbox.y);
    await worker.terminate();
    return blocks;
};

const convertImagetoText = async (image) => {
    const blocks = await createWorkerInstance(image);
    let textObject = [];
    let fullText = "";
    blocks.forEach(block => {
        fullText += " " + block.page.text;
        const paragraphs = block.paragraphs;
        paragraphs.forEach(paragraph => {
            const lines = paragraph.lines;
            lines.forEach(line => {
                line.words.forEach(word => {
                    textObject.push({
                        text: word.text,
                        baseline: word.baseline,
                        fontSize: word.font_size
                    });
                });
            });
        });
    });
    return { textObject, fullText };
}

const createPDF = async (texts, file) => {
    const pdfDoc = await PDFDocument.create()
    const imageBytes = await fs.readFile(readFile(file));

    const byteArray = new Uint8Array(imageBytes);

    const name = file.split('.')[0]; 
    const type = file.split('.')[1];

    const page = pdfDoc.addPage()
    const { height } = page.getSize();
    if (type == "png" || type == "PNG") {
        const pngImage = await pdfDoc.embedPng(byteArray);
        const pngDims = pngImage.scale(1)
        page.drawImage(pngImage, {
            x: 0,
            y: height - pngDims.height,
            width: pngDims.width,
            height: pngDims.height,
        });
    }

    if (type == "jpg" || type == "JPG") {
        const jpgImage = await pdfDoc.embedJpg(byteArray);
        const jpgDims = jpgImage.scale(1)
        page.drawImage(jpgImage, {
            x: 0,
            y: height - jpgDims.height,
            width: jpgDims.width,
            height: jpgDims.height,
        });
    }

    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fs.readFile(path.join(__dirname, `../../public/Roboto-Regular.ttf`));
    const customFont = await pdfDoc.embedFont(fontBytes);

    texts.forEach((text) => {
        page.drawText(text.text+" ", {
            x: text.baseline.x0,
            y: height - text.baseline.y0,
            size: text.fontSize,
            font: customFont,
            color: rgb(0, 0, 0),
            opacity: 0,
        });
    });

    const pdfBytes = await pdfDoc.save()
    await fs.writeFile(readFile(`${name}.pdf`), pdfBytes);
    
    return readFile(`${name}.pdf`);
}

const ocr = async (file) => {
    try {
        const texts = await convertImagetoText(file);
        const path = await createPDF(texts.textObject, file);
        return { text: texts.fullText, path }
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = { convertImagetoText, ocr }