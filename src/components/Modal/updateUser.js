import { useRef, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import axios from '../../config/axios';

const UpdateUser = ({ handleClose, show, user, fetchUser }) => {
    const usernameInputRef = useRef();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        if (user && show) {
            usernameInputRef.current.value = user.username;
            getAllRole();
        }
    }, [show, user])

    const onClickUpdate = async () => {
        const username = usernameInputRef.current.value.trim();

        if (username === "") {
            alert("Please enter full information");
        }
        else {
            const response = await axios.put('/users', { id: user.id, username: username });
            const data = [];
            roles.map(role => {
                if (role.check) {
                    data.push({ userID: user.id, roleID: role.id })
                }
            })

            const updateRole = await axios.put('/role', { userID: user.id, data: data })
            if (response && +response.EC === 0 && updateRole && +updateRole.EC === 0) {
                toast.success(response.EM);
                handleClose();
                fetchUser();
            }
        }
    }

    const getAllRole = async () => {
        const res = await axios.get('role');
        if (res && +res.EC === 0) {

            const roles = res.DT.map(role => {
                if (user.Roles.some(r => r.id === role.id)) {
                    role.check = true;
                }
                else {
                    role.check = false;
                }
                return role;
            });

            setRoles(roles);
        }
    }

    const onChangeCheck = (id) => {
        const role = roles.map(r => {
            if (r.id === id) {
                r.check = !r.check;
            }
            return r;
        });

        setRoles(role);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input className="form-control" id="username" ref={usernameInputRef} />
                    </div>

                    {roles.map((role) => {
                        return (
                            <div className="form-check mt-4" key={role.id}>
                                <input className="form-check-input" type="checkbox" value={role.id} checked={role.check} onChange={() => onChangeCheck(role.id)} />
                                <label className="form-check-label" >
                                    {role.name}
                                </label>
                            </div>
                        );
                    })}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => onClickUpdate()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateUser;