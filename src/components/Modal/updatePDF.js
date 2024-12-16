import { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';



const UpdatePDF = ({ handleClose, show, onClickSave, onClickUpdate, pdf }) => {
    const nameInputRef = useRef();
    const describeInputRef = useRef();
    const textInputRef = useRef();

    useEffect(() => {
        if (pdf) {
            nameInputRef.current.value = pdf.name;
            describeInputRef.current.value = pdf.describe;
            textInputRef.current.value = pdf.text;
        }
    }, [pdf])

    const onClick = async () => {
        const name = nameInputRef.current.value.trim();
        const describe = describeInputRef.current.value.trim();

        if (name === "") {
            toast.error("Please enter full information");
        }

        if (onClickSave) {
            await onClickSave({ name, describe })
            handleClose();
        }

        if (onClickUpdate) {
            const text = textInputRef.current.value;
            await onClickUpdate({ id: pdf.id, name, describe,text })
            handleClose();
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} centered >
                <Modal.Header closeButton>
                    <Modal.Title>{pdf ? "Update PDF" : "Add PDF"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input className="form-control" id="name" ref={nameInputRef} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="describe" className="form-label">Describe</label>
                        <input className="form-control" id="describe" ref={describeInputRef} />
                    </div>
                    {pdf &&
                        <div className="mb-3">
                            <label htmlFor="text" className="form-label">Text</label>
                            <textarea className="form-control" id="text" ref={textInputRef} />
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => onClick()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdatePDF;