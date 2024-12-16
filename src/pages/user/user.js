import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from '../../config/axios';
import { toast } from 'react-toastify';
import UpdateUser from '../../components/Modal/updateUser';
import PaginatedItems from '../../components/Paginate/paginate';
import './user.css';

const Items = ({ currentItems, onClickDelete, onClickShowModal,itemOffset }) => {
    return (
        <>
            {
                currentItems.length > 0 && currentItems.map((user) =>
                    <tr key={'key ' + user.id}>
                        <td>{++itemOffset}</td>
                        <td>{user.username}</td>
                        <td>{new Date(user.createdAt).getDate() + "/" + new Date(user.createdAt).getMonth() + "/" + new Date(user.createdAt).getFullYear()}</td>
                        <td>
                            {user.username !== "" && user.Roles.some(role => role.name === 'admin') ? "Admin" :
                                (
                                    <>
                                        <button className="btn btn-danger mx-2" onClick={() => onClickDelete(user.id)}>Delete</button>
                                        <button className="btn btn-primary" onClick={() => onClickShowModal(user)}>Update</button>
                                    </>
                                )

                            }

                        </td>
                    </tr>
                )
            }
        </>
    );
}


const User = () => {
    const [listUser, setListUser] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [userCurrent, setUserCurrent] = useState(null);

    useEffect(() => {
        fetchUser();
    }, [])

    const fetchUser = async () => {
        const response = await axios.get('users');
        if (response && +response.EC === 0) {
            setListUser(response.DT);
        }
    }

    const onClickDelete = async (id) => {
        const response = await axios.delete(`users/${id}`)
        if (response) {
            if (+response.EC === 0) {
                toast.success(response.EM);
                fetchUser();
            }
            else {
                toast.delete(response.EM);
            }
        }
    }

    const onClickShowModal = (user) => {
        setUserCurrent(user)
        setShowModal(true)
    }

    return (
        <div className='container full-width-table'>
            <Table striped bordered hover className='my-4'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Username</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='col-12'>
                    {listUser.length > 0 && <PaginatedItems itemsPerPage={5} items={listUser} ItemsComponent={Items} onClickDelete={onClickDelete} onClickShowModal={onClickShowModal} />}
                </tbody>
            </Table>
            <UpdateUser handleClose={() => { setShowModal(false) }} show={showModal} user={userCurrent} fetchUser={fetchUser} />
        </div>
    );
}

export default User;