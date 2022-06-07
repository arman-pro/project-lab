import { useFormik } from "formik";
import { useState, useMemo, memo, useCallback, useEffect } from "react";
import { Button, Form, FormGroup } from "reactstrap";
import InputField from "../../Form/InputField";
import InputWithButton from '../../Form/InputWithButton';
import { test_field, test_validation } from "./test_field";


const GenerateButton = memo(({onClickHandler}) => {
    console.log('gen button');
    return (
        <Button type="button" color="dark" onClick={onClickHandler}>Generate</Button>
    );
});

const PercentText = memo(() => {
    console.log('percent text');
    return (
        <Button type="button" color="dark">
            <b>%</b>
        </Button>
    );
});

const AddTest = () => {
    const [categories, setCategories] = useState([]);

    const {setValues, setErrors, getFieldProps, errors, touched, handleSubmit, resetForm} = useFormik({
        initialValues: test_field,
        validationSchema: test_validation,
        onSubmit : (value, formProps) => {}
    });

    useEffect(() => {

    }, []);

    const formik = useMemo(() => {
        return {getFieldProps, errors, touched};
    }, [getFieldProps, errors, touched]);

    const {name, code, price, ref_percent, ref_amount, category} = useMemo(() => {
        return {
            name: {
                name: "name",
                type: "text",
                label: "Test Name",
                id: "test_name"
            },
            code: {
                name: "code",
                type: "text",
                id:"code",
                label: "Code"
            },
            price: {
                name: "price",
                type: "number",
                label: "Price",
                min: 0,
                id: "price"
            },
            ref_percent: {
                name: "ref_percent",
                type: "number",
                label: "Ref. Percent",
                min: 0,
                id: "ref_percent"
            },
            ref_amount: {
                name: "ref_amount",
                type: "number",
                label: "Ref. Amount",
                min: 0,
                id: "ref_amount"
            },
            category: {
                name: "category_id",
                type: "select",
                label: "Category",
                id: "category_id"
            }
        }
    }, []);

    const generateCode = useCallback(() => {
        let gencode = `${new Date().valueOf()}`.substr(5);
        setValues(prevState => {
            return {...prevState, code: gencode }
        });
    }, [setValues]);

    return (
        <Form method="post">
            <h4>Create New Test</h4>
            <FormGroup>
                <InputField
                    formik={formik}
                    input={name}
                />
            </FormGroup>
            <FormGroup>
                <InputWithButton
                    formik={formik}
                    input={code}
                    leftButton={<GenerateButton onClickHandler={generateCode} />}
                />
            </FormGroup>

            <FormGroup>
                <InputField
                    formik={formik}
                    input={category}
                />
            </FormGroup>

            <FormGroup>
                <InputField
                    formik={formik}
                    input={price}
                />
            </FormGroup>
            <FormGroup>
                <InputWithButton
                    formik={formik}
                    input={ref_percent}
                    leftButton={<PercentText/>}
                />
            </FormGroup>
            <FormGroup>
                <InputField
                    formik={formik}
                    input={ref_amount}
                />
            </FormGroup>
            <FormGroup className="mb-2">
                <Button type="submit" color="success">Create</Button>
                <Button type="button" className="float-end" color="danger" onClick={resetForm}>Clear</Button>
            </FormGroup>
        </Form>
    );
};

export default memo(AddTest);