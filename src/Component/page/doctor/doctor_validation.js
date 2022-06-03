import * as Yup from "yup";

const doctor_validation = Yup.object({
    name: Yup.string().required('Name field is requeired').max(25, 'Name must be at least 25 character'),
    email: Yup.string().email(),
    phone: Yup.string().length(11),
    description: Yup.string().nullable()
});

export default doctor_validation;