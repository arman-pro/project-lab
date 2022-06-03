import React, { useEffect, useState } from 'react'
import Preloader from '../../Loader/Preloader'
import "./Doctor.css"
import AddDoctor from './AddDoctor';
import DropDown from '../../OtherComp/DropDown';
import { BiGridAlt,BiPencil,BiTrash } from "react-icons/bi";
import { DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import useGetLoader from '../../Hooks/useGetLoader';
import InfoAlert from '../../OtherComp/InfoAlert';
import useDelete from '../../Hooks/useDelete';
import useToast from '../../Hooks/useToast';
import useConfirm from '../../Hooks/useConfirm';

function Doctors() {
    const { isLoading, isError, sendRequest } = useGetLoader();
    const [doctors, setDoctors] = useState(null);
    const { sendDelete } = useDelete();
    const notify = useToast();
    const { confirm } = useConfirm();

    useEffect(() => {
        return sendRequest(`/doctors`, setDoctors);
    }, [sendRequest]);

    function deleteDoctor(id) {
        confirm('Are you sure to delete?').then(function(res){
            if(res) {
                notify(sendDelete(`/doctors/${id}`, function(){
                    setDoctors(preDoctors => preDoctors.filter(item=>item.id !== id));
                }));
                return;
            }
            return;
        });
    }

    return (
        <div className="p-3 position-relative" style={{ minHeight: "100vh" }}>
            {
                <React.Fragment>
                   
                    <div className="row">
                        <div className='col-8 col-md-8 col-sm-12 border rounded shadow position-relative'>
                       { isLoading && <Preloader /> }
                       {isError && <InfoAlert message={isError} />}
                       {doctors && <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Name</th>
                                    <th>E-mail</th>
                                    <th>Phone</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    doctors.length > 0 ? doctors.map((item, index) => (
                                        <tr key={index}>
                                            <td>#{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email ? item.email : 'N/A'}</td>
                                            <td>{item.phone ? item.phone : 'N/A'}</td>
                                            <td>
                                                {item.description}
                                            </td>
                                            <td className="action">
                                            <DropDown text={<BiGridAlt/>}>
                                                <DropdownItem tag={Link} to={`/doctors/${item.id}/edit`}>
                                                    <BiPencil/> Edit
                                                </DropdownItem>                                        
                                                <DropdownItem onClick={()=> deleteDoctor(item.id)} className="text-danger">
                                                    <BiTrash/> Delete
                                                </DropdownItem>
                                            </DropDown>
                                            </td>
                                        </tr>
                                    )) : (<tr><td className="text-center text-muted" colSpan={4}>No Data Found</td></tr>)
                                }

                            </tbody>
                            
                        </table> }
                        </div>
                            <div className="col-4 col-md-4 col-sm-12">
                                <AddDoctor storeState={setDoctors} />
                            </div>
                    </div>
                </React.Fragment>
            }
           
            
        </div>
    )
}

export default Doctors

