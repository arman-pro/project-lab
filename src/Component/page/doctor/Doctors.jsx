import React, { useEffect, useState } from 'react'
import Preloader from '../../Loader/Preloader'
import "./Doctor.css"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Doctors() {
    const [loader, setLoader] = useState(true);
    const [doctors, setDoctors] = useState([]);
    const [message, setMessage] = useState({show:false, text:""});

    useEffect(() => {
        axios.get("/doctors")
            .then((res) => {
                let response = res.data.doctors;
                if (res.status === 200) {
                    //   loader false
                    setLoader(false);
                    setDoctors(response.data);
                }
            })
            .catch((e) => {
                // loader false
                setLoader(false);
                setMessage({
                    show: true,
                    text: e.message
                });
            });
        console.log('run');
    }, [])

    const removeDoctor = (id) => {
        console.log('click');
        toast.warn('Deleting...', {
            position: "top-right",
            className: 'foo-bar',
            theme: 'dark',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    return (
        <div className="p-3 position-relative" style={{ minHeight: "100vh" }}>
            <ToastContainer />

            {loader ? (<Preloader />) :
                < table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.length > 0 ? doctors.map((item, index) => (
                                <tr key={index}>
                                    <td>#{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        {item.description}
                                    </td>
                                    <td className="action">
                                        <span role="button" className="p-1" >
                                            <i className="fa fa-edit text-success"></i>
                                        </span> &nbsp;&nbsp;
                                        <span role="button" className="p-1" onClick={() => removeDoctor(item.id)} >
                                            <i className="fa fa-trash text-danger"></i>
                                        </span>
                                    </td>
                                </tr>
                            )) : <tr><td className="text-center text-muted" colSpan={4}>No Data Found</td></tr>
                        }
                       
                        
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className='text-center text-muted' colSpan="4">Doctors List</td>
                        </tr>
                    </tfoot>
                </table>
            }
           
            
        </div>
    )
}

export default Doctors

