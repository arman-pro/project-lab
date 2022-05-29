import React, { useEffect, useState } from 'react'
import Preloader from '../../Loader/Preloader'
import "./Doctor.css"
import axios from 'axios'
import { toast } from 'react-toastify';

function Doctors() {
    const [loader, setLoader] = useState(true);
    const [doctors, setDoctors] = useState([])

    const getAllDoctors = () => {
        const controller = new AbortController();
        axios.get("/doctors",  {signal: controller.signal})
            .then((res) => {
                let response = res.data.doctors;
                // console.log(response);
                if (res.status === 200) {
                    //   loader false
                    setLoader(false);
                    setDoctors(response.data);
                }
            })
            .catch((e) => {
                setLoader(false);
            });
        return () => {
            controller.abort();
        }
    }

    useEffect(() => {
        console.log('run');
        return getAllDoctors();
    }, [])

    const removeDoctor = (id) => {
        axios.delete(`/doctors/${id}`).then(res => {
            if (res.status === 200) {
                // remove delete item
                setDoctors(doctors.filter(item => item.id !== id));
                let message = res.data.message;
                toast.success(`${message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            } else if (res.status === 204) {
                toast.info(`No Content Found!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
        }).catch(e => {
            if (e.response) {
                const data = e.response.data;
                toast.warn(`${data.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            } else if(e.request) {
                console.log('request error');
                const data = e.request.data;
                console.log(data.message);
            } else {
                console.log('other error');
                console.log(e);
            }
            
        });
    }

    const addNewDoctorForm = (e) => {
        e.preventDefault();
        let doctor = { "name": e.target.doctorName.value, "description": e.target.description.value };
    
        toast.promise(axios.post('/doctors', doctor).then(res => {
            //successfully created
            if (res.status === 201) {
                let message = res.data.message;
                return message;
            }
        }).catch(e => {
            if (e.response) {
                const data = e.response.data;
                return data;
            }
            throw new Error(e.message);
        }), {
            pending: "Pealse wait a  moment...",
            success: {
                render({ data }) {
                    return `${data}`
                }
            },
            error: {
                render({ data }) {
                    return `${data}`;
                }
            }
        });
        // getAllDoctors()
        e.target.reset();
    }

    return (
        <div className="p-3 position-relative" style={{ minHeight: "100vh" }}>
            {loader ? (<Preloader />) :
                <React.Fragment>
                   
                    <div className="row">
                        <div className='col-8 col-md-8 col-sm-12 border rounded shadow'>
                        <table className="table table-hover" style={{fontSize:"13px"}}>
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
                                    )) : (<tr><td className="text-center text-muted" colSpan={4}>No Data Found</td></tr>)
                                }

                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className='text-end text-muted' colSpan="4">
                                        <button className="btn btn-sm btn-outline-dark">
                                            <b><i className="fa fa-angle-double-left"></i>  </b> 
                                        </button> {" "}
                                        <button className="btn btn-sm btn-outline-dark">
                                            <b><i className="fa fa-angle-double-right"></i>  </b> 
                                        </button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        </div>
                            <div className="col-4 col-md-4 col-sm-12" style={{fontSize:"13px"}}>
                                <form action="" onSubmit={addNewDoctorForm} method="post" className="border rounded p-3 shadow">
                                    <h6>Add New Doctor</h6>
                                    <div className="mb-3">
                                        <label htmlFor="doctorName" className="form-label">Doctor Name</label>
                                        <input type="text" name="doctorName" id="doctorName" className="form-control" placeholder="Doctor Name" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea name="description" id="description" className="form-control" cols="30" rows="3" placeholder="Description"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-sm btn-success">Create</button>
                                        <button type="button" className="btn btn-sm btn-outline-danger float-end">Cancel</button>
                                    </div>
                                </form>
                            </div>
                    </div>
                </React.Fragment>
            }
           
            
        </div>
    )
}

export default Doctors

