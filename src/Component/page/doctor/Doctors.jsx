import React, { useEffect, useState } from 'react'
import Preloader from '../../Loader/Preloader'
import "./Doctor.css"
import AddDoctor from './AddDoctor';
import DropDown from '../../OtherComp/DropDown';
import { BiGridAlt,BiPencil,BiTrash } from "react-icons/bi";
import { DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import useGetLoader from '../../Hooks/useGetLoader';
import InfoAlert from '../../OtherComp/InfoAlert';
import useDelete from '../../Hooks/useDelete';
import useToast from '../../Hooks/useToast';
import useConfirm from '../../Hooks/useConfirm';
import DataTable from 'react-data-table-component';

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

    const columns = [
        {
            name: "SL",
            width: "auto",
            selector: (row, index) => (index + 1) < 10 ? `0${index + 1}` : `${index + 1}`
        },
        {
            name: "Name",
            wrap: true,
            grow: 2,
            selector: doctor => doctor.name
        },
        {
            name: "E-Mail",
            wrap:true,
            grow: 4,
            selector: doctor => doctor.email
        },
        {
            name: "Phone",
            wrap:true,
            grow: 3,
            selector: doctor => doctor.phone
        },
        {
            name: "Description",
            wrap:true,
            grow: 3,
            style: {
                padding: "5px"
            },
            selector: doctor => doctor.description
        },
        {
            name: "Action",
            width: "auto",
            selector: doctor => {
                return (
                    <DropDown text={<BiGridAlt/>}>
                        <DropdownItem tag={Link} to={`/doctors/${doctor.id}/edit`}>
                            <BiPencil/> Edit
                        </DropdownItem>                                        
                        <DropdownItem onClick={()=> deleteDoctor(doctor.id)} className="text-danger">
                            <BiTrash/> Delete
                        </DropdownItem>
                    </DropDown>
                );
            }
        }
    ];

    return (
        <div className="p-3 position-relative" style={{ minHeight: "100vh" }}>
            {
                <React.Fragment>
                   
                    <div className="row">
                        <div className='col-8 col-md-8 col-sm-12 border rounded shadow position-relative'>
                       { isLoading && <Preloader /> }
                       {isError && <InfoAlert message={isError} />}
                       {
                           doctors && <DataTable columns={columns} data={doctors} pagination />
                       }
                       
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

