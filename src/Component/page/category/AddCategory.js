import { useFormik } from 'formik';
import React, {useMemo} from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import InputField from '../../Form/InputField';
import InputWithButton from '../../Form/InputWithButton';
import { category_initial, category_validation } from './cateogry_field';
import useToast from '../../Hooks/useToast';
import usePost from '../../Hooks/usePost';

function GenerateButton({onClickHandler}) {
    return (
        <Button type="button" color="dark" onClick={onClickHandler}>Generate</Button>
    )
}

function AddCategory({addCallback}) {
    const notify = useToast();
    const { sendPost } = usePost();
    const {setValues, getFieldProps, errors, touched, handleSubmit, resetForm} = useFormik({
        initialValues: category_initial,
        validationSchema: category_validation,
        onSubmit: (value, props) => notify(sendPost(`/categories`, value, {formik:props, cb:addCallback}))
    });

    const formik = useMemo(() => {
        return {getFieldProps, errors, touched};
    }, [getFieldProps, errors, touched]);

    const {name_input, code_input} = useMemo(() => {
        return {
            name_input: {
                name: "name",
                type: "text",
                label: "Name",
                id: "name",
                placeholder: "write category"
            },
            code_input : {
                name: "code",
                type: "tel",
                label: "Code",
                id: "code",
                placeholder: "write code"
            }
        }
    }, []);

    function generateCode() {
        let gencode = `${new Date().valueOf()}`.substr(5);
        setValues(prevState => {
            return {...prevState, code: gencode }
        });
    }

    return (
        <Form className="border rounded shadow p-3" onSubmit={handleSubmit}>
            <h4>Create New Category</h4>
            <FormGroup>
                <InputField
                    formik={formik}
                    input={name_input}
                />
            </FormGroup>
           
            <FormGroup>
                <InputWithButton
                    formik={formik}
                    input={code_input}
                    leftButton={<GenerateButton onClickHandler={generateCode} />}
                />
            </FormGroup>
            <FormGroup check inline>
                <Input
                    type="checkbox"
                    onChange={getFieldProps('is_pathology').onChange}
                    value={true}
                    checked={getFieldProps('is_pathology').value}
                    id="is_pathology"
                />
                <Label for="is_pathology" check>Set For Pathology</Label>
            </FormGroup>
            <FormGroup className="mb-2">
                <Button type="submit" color="success">Create</Button>
                <Button type="button" className="float-end" color="danger" onClick={resetForm}>Clear</Button>
            </FormGroup>
        </Form>
    );
};

export default React.memo(AddCategory);