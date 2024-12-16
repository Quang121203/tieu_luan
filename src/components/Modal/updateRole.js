import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import axios from '../../config/axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const UpdateRole = ({ handleClose, show, role, type }) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        if (show) {
            getAllItems();
        }

    }, [type, role, show]);

    const getAllItems = async () => {
        let res;
        let resCheckByRole;
        if (type === "menu") {
            res = await axios.get('menu');
            resCheckByRole = await axios.get(`menu/${role.name}`);
        }

        if (type === "user") {
            res = await axios.get('users');
            resCheckByRole = await axios.get(`users/role/${role.id}`);
        }

        if (res && +res.EC === 0) {
            const items = res.DT;

            if (resCheckByRole && +resCheckByRole.EC === 0 && items.length > 0) {
                const itemByRole = resCheckByRole.DT;

                const itemCheck = items.map(item => {
                    if (item.username) {
                        item.name = item.username
                    }

                    if (itemByRole.some(m => m.id === item.id)) {
                        item.check = true;
                    }
                    else {
                        item.check = false;
                    }
                    return item;
                });

                setItems(itemCheck);
            }
        }
        else {
            setItems(null);
        }
    }


    const onChangeCheck = (id) => {
        const item = items.map(i => {
            if (i.id === id) {
                i.check = !i.check;
            }
            return i;
        });

        setItems(item);
    }

    const renderMenuRows = () => {
        if (items) {
            const rows = [];
            const numberOfCols = 3;
            const numRows = Math.ceil(items.length / numberOfCols);

            for (let i = 0; i < numRows; i++) {
                const cols = [];
                for (let j = 0; j < numberOfCols; j++) {
                    const index = i * numberOfCols + j;
                    if (index < items.length) {
                        cols.push(
                            <Col key={items[index].id}>
                                <input className="form-check-input mx-2" type="checkbox" value={items[index].id} checked={items[index].check} onChange={() => onChangeCheck(items[index].id)} />
                                <label className="form-check-label" >
                                    {items[index].name}
                                </label>
                            </Col>
                        );
                    }
                    else{
                        cols.push(<Col key={`id-${index}`}></Col>);
                    }
                }
                rows.push(
                    <Row key={i}>
                        {cols}
                    </Row>
                );
            }

            return rows;
        }
        return <></>
    }

    const onClickUpdate = async () => {

        const data = [];
        let res;
        if (type === "menu") {
            items.map(item => {
                if (item.check) {
                    data.push({ menuID: item.id, roleID: role.id })
                }
            })
            res = await axios.put('/role/menu', { roleID: role.id, data: data })

        }

        if (type === "user") {
            items.map(item => {
                if (item.check) {
                    data.push({ userID: item.id, roleID: role.id })
                }
            })
            res = await axios.put('/role/user', { roleID: role.id, data: data })

        }

        if (res && +res.EC === 0) {
            toast.success(res.EM);
            handleClose();
        }


    }

    return (
        <>
            <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Update {type} role {role.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        {renderMenuRows()}
                    </Container>
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

export default UpdateRole;