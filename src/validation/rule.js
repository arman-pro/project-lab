
const validation_rule = {
    string: function(field_name) {
        return `${field_name} is must be string`;
    },
    required: function(field_name) {
        return `${field_name} is required`;
    },
    min: function(field_name,  value) {
        return `${field_name} is minimum ${value} character`;
    },
    max: function(field_name,  value) {
        return `${field_name} is maximum ${value} character`;
    },
    email: function(field_name) {
        return `This email is invalid`;
    }

}

export default validation_rule;