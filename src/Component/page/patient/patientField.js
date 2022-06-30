import * as Yup from "yup";

const patient_field = {
    reference_no: "",
    report_date: "",
    delivery_time: "",
    name: "",
    phone: "",
    age: "",
    gender: "",
    ref_co: "",
    ref_doctor: "",
    total: "",
    discount: "",
    grand_total: "",
    cash_payment: "",
    total_due: "",
    notes: "",
    tests: [],
    isDraft: false,   
};

const patient_validation = Yup.object({
    name: Yup.string().required('Patient name field is required').min(3),
    phone: Yup.string().required().length(11).matches(/^[0-9]+$/, 'Phone number must be only number'),
    age: Yup.string().min(0.1, 'Age is not less then 0.1').required('Age is required field'),
    gender: Yup.string().required('Gender is required field'),
    ref_co: Yup.string(),
    ref_doctor: Yup.string(),
    discount: Yup.number().min(0,'Discount is not less then 0'),
    grand_total: Yup.number().min(0,'Grand total is not less then 0'),
    cash_payment: Yup.number().min(0,'Cash Payment is not less then 0'),
    total_due: Yup.number().min(0,'Total due is not less then 0'),
    tests: Yup.array().min(1, 'Please select test')
});



export {patient_field, patient_validation}