import React from 'react';
import ContentLayout from "../../layout/ContentLayout";
import AddTest from './AddTest';

const Test = () => {
    return (
        <ContentLayout>
            <div className="row">
                <div className='col-8 col-md-12 col-sm-12 border rounded shadow position-relative'>
                    <table className="table table-borderded">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Test</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Ref. Fee(%)</th>
                                <th>Ref. Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01</td>
                                <td>Demo Test</td>
                                <td>Demo Category</td>
                                <td>1200</td>
                                <td>10%</td>
                                <td>120</td>
                                <td>&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='col-12 col-md-12 col-sm-12 border rounded p-3 shadow mt-5'>
                    <AddTest/>
                </div>
            </div>
        </ContentLayout>
    );
};

export default React.memo(Test);