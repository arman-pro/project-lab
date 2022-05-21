import * as Yup from 'yup';

const co_validation = Yup.object({
    full_name: Yup.string()
        .required()
        .min(3)
        .max(25),
    code: Yup.string().required().length(4),
    phone: Yup.string().required('Phone field is required').length(11)
});

export default co_validation;