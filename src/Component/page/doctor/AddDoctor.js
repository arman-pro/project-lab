import { useFormik } from 'formik';
import React from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import InputField from '../../Form/InputField';
import doctor_validation from './doctor_validation';
import usePost from '../../Hooks/usePost';
import useToast from '../../Hooks/useToast';


const AddDoctor = ({storeState}) => {
    const {sendPost} = usePost();
    const notify = useToast();
    const formik = useFormik({
        initialValues: {name: "",email:"",phone:"", description: ""},
        validationSchema: doctor_validation,
        onSubmit: (value, formikProps) => notify(sendPost(`/doctors`, value, {formik:formikProps, storeState}))
    });

    return (
        <Form inline method="post" onSubmit={formik.handleSubmit} className="border rounded p-3 shadow">
            <h6>Add New Doctor</h6>
            <FormGroup className="mb-2">
                <InputField
                    formik={formik}
                    input={{
                        name: "name",
                        type: "text",
                        label: "Name",
                        id: "name"
                    }}
                />
            </FormGroup>
            <FormGroup className="mb-2">
                <InputField
                    formik={formik}
                    input={{
                        name: "email",
                        type: "email",
                        label: "E-mail",
                        id: "email"
                    }}
                />
            </FormGroup>
            <FormGroup className="mb-2">
                <InputField
                    formik={formik}
                    input={{
                        name: "phone",
                        type: "tel",
                        label: "Phone",
                        id: "phone"
                    }}
                />
            </FormGroup>
            <FormGroup className="mb-2">
                <InputField
                    formik={formik}
                    input={{
                        name: "description",
                        type: "textarea",
                        label: "Description",
                        id: "description"
                    }}
                />
            </FormGroup>
            <FormGroup className="mb-2">
                <Button color="success" type="submit">
                    Save
                </Button>
                <Button color="danger" className="float-end" type="button" onClick={formik.resetForm}>
                    Clear
                </Button>
            </FormGroup>
          
        </Form>
    )
};

export default React.memo(AddDoctor);