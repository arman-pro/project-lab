import * as Yup from 'yup';

const co_validation = Yup.object({
    full_name: Yup.string()
        .required('Full name is required field')
        .min(3, 'Full name must be at least 3 character')
        .max(25, 'Full name must be maximum 25 character'),
    code: Yup.string().required().length(4),
    phone: Yup.string().required('Phone field is required').length(11)
});

export default co_validation;