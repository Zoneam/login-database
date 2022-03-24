//Validation 
const Joi = require('@hapi/joi');


// Registration Validation
const registrationValidation = (data) => {

    const schema = Joi.object().keys({
        name: Joi.string().min(2).max(20).required(),
        lastName: Joi.string().min(2).max(20).required(),
        age: Joi.number().min(18).max(150),
        email: Joi.string().min(6).max(35).email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

const loginValidation = (data) => {

    const schema = Joi.object().keys({
        email: Joi.string().min(6).max(35).email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;