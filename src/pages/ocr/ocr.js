import './ocr.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from '../../config/axios';
import { toast } from 'react-toastify';
import CropperImage from '../../components/Cropper/cropper';
import UpdatePDF from '../../components/Modal/updatePDF';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import Webcam from "react-webcam";


const Ocr = () => {
  const [file, setFile] = useState(null); //file image
  const [isLoading, setIsLoading] = useState(false);
  const [fileCut, setFileCut] = useState(null); //file image was cut
  const [pdfUrl, setPdfUrl] = useState(null); //file pdf from server
  const [text, setText] = useState(''); //text from server
  const [show, setShow] = useState(false);
  const [isCam, setIsCam] = useState(false);

  const user = useSelector(selectUser);

  const onChangeFile = (e) => {
    const _file = e.target.files[0];
    if (_file) {
      const type = _file.type
      if (type === 'image/jpeg' || type === 'image/png' || type === 'image/bmp') {
        setFile(_file);
      }
      else {
        setFile(null);
        toast.error('Please import a image file');
      }
    }

  }

  const onClickOCR = async () => {
    if (!file) {
      toast.error('Please import a image file');
      return;
    }
    setIsLoading(true);

    const data = new FormData();
    const fileName = Date.now() + file.name;
    data.append("name", fileName);
    data.append("file", file);

    const res = await axios.post('ocr', data);
    const { pdf, text } = res.DT;
    setIsLoading(false);

    const byteCharacters = atob(pdf);
    const byteNumbers = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const pdfBlob = new Blob([byteNumbers], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
    setText(text);
  }

  const onClickCut = async () => {
    if (!file) {
      toast.error("Please import file")
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFileCut(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const onClickSave = async (objectPdf) => {
    setIsLoading(true);
    const pdfResponse = await fetch(pdfUrl);
    const blob = await pdfResponse.blob();

    const data = new FormData();
    const date = Date.now();
    data.append("pdf", blob, `${date + file.name.split('.')[0]}.pdf`);
    data.append("image", file, date + file.name);

    data.append("objectPdf", JSON.stringify({
      userName: user.username,
      name: objectPdf.name,
      describe: objectPdf.describe,
      text: text,
      fileName: Date.now() + file.name,
    }));

    const res = await axios.post('pdf', data);
    toast.success(res.EM);

    setIsLoading(false);
    onClickClear();
  }

  const onClickClear = () => {
    setFile(null);
    setFileCut(null);
    setPdfUrl(null);
    setText("");
  }

  const onClickCam = () => {
    onClickClear();
    setIsCam(true);
  }

  return (
    <div className='container d-flex-col my-4 align-items-center flex-column ocr'>
      <div className='d-flex align-items-center justify-content-between my-3'>
        <InputGroup className="me-2">
          <Form.Control
            placeholder="File"
            type="file"
            onChange={onChangeFile}
          />
        </InputGroup>

        {!isCam && <i className="fa-solid fa-camera" onClick={() => onClickCam()}></i>}
        {isCam && <i className="fa-regular fa-circle-xmark" onClick={() => setIsCam(false)}></i>}
      </div>
    
      {isCam &&
        <Webcam
          audio={false}
          height={720}
          screenshotFormat="image/jpeg"
          width={1280}
        >
          {({ getScreenshot }) => (
            <button
              onClick={() => {
                const imageSrc = getScreenshot()
                setFileCut(imageSrc);
                setFile(imageSrc);
                setIsCam(false);
              }}
            >
              Capture photo
            </button>
          )}
        </Webcam>
      }

      {file && (
        !isLoading ? (
          <div className='d-flex '>
            <Button variant="primary col-3" onClick={() => onClickOCR()}>OCR</Button>
            <Button variant="primary col-3 mx-2" onClick={() => onClickCut()}>Cut</Button>
            {pdfUrl && text && <Button variant="primary col-3 mx-2" onClick={() => setShow(true)}>Save</Button>}
            {((pdfUrl && text) || fileCut) && <Button variant="primary col-3 mx-2" onClick={() => onClickClear()}>Clear</Button>}
          </div>

        ) : (
          <Button variant="secondary col-6">Loading......</Button>
        )
      )}

      {file && fileCut && (
        <CropperImage image={fileCut} setFile={setFile} />
      )}

      {pdfUrl && text && (
        <div className='d-flex justify-content-between'>
          <iframe
            src={pdfUrl}
            height="100%"
            title="PDF Viewer"
            className='col-6'

            style={{
              height: '600px',
            }}
          />

          <textarea value={text} style={{ height: '600px' }} className='col-5' onChange={(e) => setText(e.target.value)}></textarea>
        </div>
      )}

      <UpdatePDF show={show} handleClose={() => setShow(false)} onClickSave={onClickSave} />

    </div >

  );
}

export default Ocr;
