import * as Yup from "yup";

const category_initial = {
    name: "",
    code: "",
    is_pathology: false
};

const category_validation = Yup.object({
    name: Yup.string().required('Name field is required').min(3),
    code: Yup.string().required().length(8).matches(/^[0-9]+$/, 'Code must be only number')
});

export {category_initial, category_validation};