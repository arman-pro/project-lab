import React from "react";
import ContentLayout from "../../layout/ContentLayout";
import AddForm from "./AddForm";

const CO = () => {
    return (
        <ContentLayout>
            <div className="row">
            <div className='col-8 col-md-8 col-sm-12 border rounded shadow'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="col-4 col-md-4 col-sm-12">
                <AddForm />
            </div>
            </div>
        </ContentLayout>
    )
}

export default CO;