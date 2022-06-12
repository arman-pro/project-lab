import { useFormik } from "formik";
import { useMemo, memo, useCallback } from "react";
import { Button, Form, FormGroup,FormFeedback,Label } from "reactstrap";
import InputField from "../../Form/InputField";
import InputWithButton from '../../Form/InputWithButton';
import { test_field, test_validation } from "./test_field";
import Select from 'react-select';

const GenerateButton = memo(({onClickHandler}) => {
    return (
        <Button type="button" color="dark" className="position-relative" style={{zIndex:0}} onClick={onClickHandler}>Generate</Button>
    );
});

const PercentText = memo(() => {
    return (
        <Button type="button" color="dark">
            <b>%</b>
        </Button>
    );
});

const AddTest = ({editTest, categories, saveTest}) => {
    const { setValues, getFieldProps, errors, touched, handleSubmit, resetForm} = useFormik({
        initialValues: editTest ? editTest : test_field,
        validationSchema: test_validation,
        onSubmit : (value, formProps) => saveTest(value, formProps)
    });

    const formik = {getFieldProps, errors, touched};

    const percentFormik = {
        getFieldProps : (name) => {
            let {onBlur} = getFieldProps(name);
            const customeBlur = (e) => {
                let percent = e.target.value;
                if(percent) {
                    setValues(preState => {
                        return {
                            ...preState, 
                            'ref_amount' : Math.round((getFieldProps('price').value ?? 0) * (percent ?? 0) / 100)
                        }
                    });
                };
                onBlur(e);
                return;
            }
            return {...getFieldProps(name), onBlur:customeBlur};
        },
        errors, touched
    };

    const refFormik = {
        getFieldProps : (name) => {
            let {onBlur} = getFieldProps(name);
            const customeBlur = (e) => {
                let amount = e.target.value;
                if(amount) {
                    setValues(preState => {
                        return {
                            ...preState, 
                            'ref_percent' : Math.ceil((100 * (amount ?? 0)) / (getFieldProps('price').value ?? 0))
                        }
                    });
                };
                onBlur(e);
                return;
            }
            return {...getFieldProps(name), onBlur:customeBlur};
        },
        errors, touched
    };

    

    const {name, code, price, ref_percent, ref_amount} = useMemo(() => {
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
            }
        }
    }, []);

    const generateCode = useCallback(() => {
        let gencode = `${new Date().valueOf()}`.substr(5);
        setValues(prevState => {
            return {...prevState, code: gencode }
        });
    }, [setValues]);
    
    const categoryHandle = (props) => {
        touched['category_id'] = true;
        if(!props) {
            setValues(preValue => {
                return {...preValue, category_id: ''}
            });
            return;
        }
        let {value} = props;
        setValues(preValue => {
            return {...preValue, category_id: value}
        });
    }

    const selectClassName = 'form-control p-0 border-0 '+touched['category_id'] && errors['category_id'] ? ' is-invalid' : '';

    return (
        <Form method="post" onSubmit={handleSubmit} >
            <FormGroup>
                <Label htmlFor="category_id">Category</Label>
                <Select
                    className={selectClassName}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    onChange={categoryHandle}
                    name="category_id"
                    id="category_id"
                    options={categories}
                    placeholder="Select Category"
                    style={{zIndex:"100"}}
                    defaultValue={editTest ? {value : editTest.id, label: editTest.category_name} : null}
                    />
                    {
                        touched['category_id'] && errors['category_id'] && (<FormFeedback>{errors['category_id']}</FormFeedback>) 
                    }
            </FormGroup>

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
                    input={price}
                />
            </FormGroup>
            <FormGroup>
                <InputWithButton
                    formik={percentFormik}
                    input={ref_percent}
                    leftButton={<PercentText/>}
                />
            </FormGroup>
            <FormGroup>
                <InputField
                    formik={refFormik}
                    input={ref_amount}
                />
            </FormGroup>
            <FormGroup className="mb-2">
                {!editTest && <Button type="submit" color="success">Create</Button>}
                {editTest && <Button type="submit" color="success">Save</Button>}
                <Button type="button" className="float-end" color="danger" onClick={resetForm}>Clear</Button>
            </FormGroup>
        </Form>
    );
};

export default memo(AddTest);