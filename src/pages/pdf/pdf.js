import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from '../../config/axios';
import { toast } from 'react-toastify';
import UpdatePDF from '../../components/Modal/updatePDF';
import PaginatedItems from '../../components/Paginate/paginate';
import './pdf.css';

const Items = ({ currentItems, onClickDelete, onClickShowModal, itemOffset }) => {
    return (
        <>
            {
                currentItems.length > 0 && currentItems.map((pdf) =>
                    <tr key={'key ' + pdf.id}>
                        <td >{++itemOffset}</td>
                        <td>{pdf.name}</td>
                        <td>{pdf.describe}</td>
                        <td>{pdf.userName}</td>
                        <td>{new Date(pdf.createdAt).getDate() + "/" + new Date(pdf.createdAt).getMonth() + "/" + new Date(pdf.createdAt).getFullYear()}</td>
                        <td> 
                            <>
                                <button className="btn btn-danger mx-2" onClick={() => onClickDelete(pdf.fileName)}>Delete</button>
                                <button className="btn btn-primary" onClick={() => onClickShowModal(pdf)}>Update</button>
                            </>
                        </td>
                    </tr>
                )
            }
        </>

    );

}

const PDF = () => {
    const [listPDF, setListPDF] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [pdfCurrent, setPdfCurrent] = useState(null);


    useEffect(() => {
        getListPDF();
    }, [])

    const getListPDF = async () => {
        const response = await axios.get('pdf');
        if (response && +response.EC === 0) {
            setListPDF(response.DT);
        }
    }

    const onClickDelete = async (fileName) => {
        const response = await axios.delete(`pdf/${fileName}`);
        if (response && +response.EC === 0) {
            toast.success(response.EM);
            getListPDF();
        }
    }

    const onClickShowModal = (pdf) => {
        setPdfCurrent(pdf)
        setShowModal(true)
    }

    const onClickUpdate = async (pdf) => {
        const res = await axios.put('pdf', pdf);
        toast.success(res.EM);
        getListPDF();
    }

    return (
        <div className='container  full-width-table'>
            <Table striped bordered hover className='my-4'>
                <thead>
                    <tr>
                        <th >STT</th>
                        <th >Name</th>
                        <th >Describe</th>
                        <th >By</th>
                        <th >Create At</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody className='col-12'>
                    {listPDF.length > 0 && <PaginatedItems className="col-12" itemsPerPage={5} items={listPDF} ItemsComponent={Items} onClickDelete={onClickDelete} onClickShowModal={onClickShowModal} />}
                </tbody>
            </Table>
            <UpdatePDF handleClose={() => { setShowModal(false) }} show={showModal} pdf={pdfCurrent}  onClickUpdate={onClickUpdate}/>
        </div>
    );
}

export default PDF;