import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Text = ({ handleClose, show, text }) => {
  
    return (
        <>
            <Modal show={show} onHide={handleClose} centered style={{ zIndex: 10000 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Text</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Text</label>
                        <textarea className="form-control" id="text"  value={text} style={{minHeight: "60vh"}} readOnly/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Text;