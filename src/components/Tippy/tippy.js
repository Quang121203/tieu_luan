import { useState } from "react";
import axios from "../../config/axios";
import Text from "../Modal/text";

const Tippy = ({ data }) => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");

    const onClickView = async (fileName) => {
        let type= fileName.split('.')[1];

        if(type == 'jpg' || type == 'JPG'){
            type='image/jpeg'
        }
        else if(type == 'png' || type == 'PNG'){
            type='image/png'
        }
        else{
            type='application/pdf'
        }
      
        const response = await axios.get(`viewpdf/${fileName}`, {
            responseType: 'blob'
        });
        const blob = new Blob([response], { type});
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    }

    const onClickViewText = (text) => {
        setText(text);
        setShow(true);
    }

    const onClickClose = () => {
        setShow(false);
    }

    return (
        <div className="container mb-4">
            {data && data.length > 0 ?
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Describe</th>
                                        <th scope="col">By</th>
                                        <th scope="col">Text</th>
                                        <th> View </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((pdf, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{pdf.name}</td>
                                                <td>{pdf.describe}</td>
                                                <td>{pdf.userName}</td>
                                                <td className="text-right">
                                                    <button className="btn btn-sm btn-primary col-12"
                                                        onClick={() => onClickViewText(pdf.text)}>VIEW
                                                    </button>
                                                </td>
                                                <td className="text-right">
                                                    <button className="btn btn-sm btn-primary col-12"
                                                        onClick={() => onClickView(pdf.fileName.split('.')[0]+".pdf")}>VIEW FILE
                                                    </button>
                                                </td>
                                                <td className="text-right">
                                                    <button className="btn btn-sm btn-primary col-12"
                                                        onClick={() => onClickView(pdf.fileName)}>VIEW IMAGE
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                :
                <div className='d-flex justify-content-center '>Don't exist PDF with keyword.........</div>
            }
            <Text show={show} handleClose={onClickClose} text={text} />

        </div>

    )
}

export default Tippy;