import * as Yup from "yup";

const test_field = {
    name: "",
    code: "",
    category_id: "",
    price: "",
    ref_percent: "",
    ref_amount: "",
};

const test_validation = Yup.object({
    name: Yup.string().required('Test field is required').min(3),
    code: Yup.string().required().length(8).matches(/^[0-9]+$/, 'Code must be only number'),
    category_id: Yup.number().required('Category field is required'),
    price: Yup.number().required('Test Price is required').min(0,'Price is not less then 0'),
    ref_percent: Yup.number().required('Refered percent is required').min(0, 'Refered percent is not less then 0'),
    ref_amount: Yup.number().required('Refered amount is required').min(0, 'Rerered amount is not less then 0')
});

export {test_field, test_validation};