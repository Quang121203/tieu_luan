import { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import axios from '../../config/axios';

const Role = ({ handleClose, show, getAllRole, type, role }) => {
    const nameInputRef = useRef();

    useEffect(() => {
        if (show && role && type === "Update") {
            nameInputRef.current.value = role.name;
        }
    }, [show, type, role]);

    const onClickAdd = async () => {
        const name = nameInputRef.current.value.trim();
        if (name === "") {
            alert("Please enter full information");
        }
        else {
            let res;
            if (type === "Add") {
                res = await axios.post('role', { name: name });
            }
            else {
                res = await axios.put('role/name', { name: name, id: role.id });
            }

            if (res) {
                if (+res.EC === 0) {
                    toast.success(res.EM);
                    handleClose();
                    getAllRole();
                }
                else {
                    toast.error(res.EM);
                }
            }
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{type} Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input className="form-control" id="name" ref={nameInputRef} />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => onClickAdd()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Role;