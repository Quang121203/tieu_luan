import Table from 'react-bootstrap/Table';
import axios from '../../config/axios';
import { useEffect, useState } from 'react';
import UpdateRole from '../../components/Modal/updateRole';
import RoleModal from '../../components/Modal/role';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

const Role = () => {
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false); //Update
    const [showModalRole, setShowModalRole] = useState(false);
    const [roleCurrent, setRoleCurrent] = useState(null);
    const [type, setType] = useState(null);
    const [typeModal, setTypeModal] = useState(null);

    useEffect(() => {
        getAllRole();
    }, []);

    const getAllRole = async () => {
        const res = await axios.get('role');
        if (res && +res.EC === 0) {
            setRoles(res.DT);
        }
    }

    const onClickShowModal = (role, type) => {
        setShowModal(true);
        setRoleCurrent(role);
        setType(type);
    }

    const onClickDelete = async (id) => {
        const res = await axios.delete(`role/${id}`);
        if (res && +res.EC === 0) {
            toast.success(res.EM);
            getAllRole();
        }
    }

    const onClickShowModalRole = (type, role) => {
        setShowModalRole(true);
        setTypeModal(type);
        setRoleCurrent(role);
    }

    return (
        <div className='container'>
            <div className='d-flex col-12 justify-content-end'>
                <Button variant="outline-primary mt-3 me-3" onClick={() => onClickShowModalRole("Add", null)}>Add Role</Button>
            </div>

            <Table striped bordered hover className='my-4'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>User</th>
                        <th>Menu</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='col-12'>
                    {roles.length > 0 && roles.map((role, index) => {
                        return (
                            <tr key={'key ' + role.id}>
                                <td>{index + 1}</td>
                                <td>{role.name}</td>
                                <td><button className="btn btn-primary" onClick={() => onClickShowModal(role, "user")}>Update</button></td>
                                <td><button className="btn btn-primary" onClick={() => onClickShowModal(role, "menu")}>Update</button></td>
                                <td>
                                    <button className="btn btn-danger mx-2" onClick={() => onClickDelete(role.id)}>Delete</button>
                                    <button className="btn btn-primary" onClick={() => onClickShowModalRole("Update", role)}>Update</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {roleCurrent && type && <UpdateRole handleClose={() => { setShowModal(false) }} show={showModal} role={roleCurrent} type={type} />}
            {typeModal &&
                <RoleModal handleClose={() => { setShowModalRole(false) }}
                    show={showModalRole} getAllRole={getAllRole}
                    type={typeModal} role={roleCurrent} />
            }
        </div>
    )
}

export default Role;