import DataTable from "react-data-table-component";
import { Button } from "reactstrap";
import { BiTrash } from "react-icons/bi";
import React from "react";

function TestList({tests}) {
    const columns = [
        {
            name: "#",
            width: "60px",
            selector: (row, index) => (index + 1) < 10 ? `0${index + 1}` : `${index + 1}`
        },
        {
            name: "Name",
            wrap: true,
            grow: 3,
            selector: test => test.name
        },
        {
            name: "Code",
            selector: test => test.code
        },
        {
            name: "Category",
            selector: test => test.category
        },
        {
            name: "Net Price",
            selector: test => test.price
        },
        {
            name: "Action",
            selector: test => {
                return ( 
                    <Button><BiTrash/></Button>
                );
            }
        }
    ];
    return (<DataTable columns={columns} data={tests} pagination />)
};

export default React.memo(TestList);