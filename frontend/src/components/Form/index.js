import React, { useState } from "react";
import { Formik, Field, Form as FormComponent } from 'formik';
import * as Yup from 'yup';
import { PrimaryButton, Div, InputAfter, FlexBox } from "..";
import colors from "../../utils/colors";

const Form = ({ id, submitText, fields, onSubmit }) => {
    const [passwordVisible, togglePasswordVisible] = useState(false);

    const initialValues = fields.reduce((acc, i) => {
        acc[i.name] = i.value || "";
        return acc;
    }, {});

    const formSchemaShape = fields.reduce((acc, i) => {
        let validation = Yup.string();
        if (i.regex) validation = validation.matches(i.regex);
        else if (i.required) validation = validation.required();
        else if (i.emailValidation) validation = validation.email();
        acc[i.name] = validation;
        return acc;
    }, {});

    const formSchema = Yup.object().shape(formSchemaShape);

    submitText = submitText || "Submit";

    const renderFields = (field, index, errors) => {
        switch (field.type) {
            case 'text':
            case 'email':
                return (
                    <Div key={index} margin="17px 0px">
                        <Field
                            type={field.type}
                            name={field.name}
                            placeholder={errors[field.name] || field.placeholder}
                            style={errors[field.name] ? { border: '1px solid red', color: 'red' } : {}}
                        />
                    </Div>
                )
            case 'password':
                return (
                    <FlexBox key={index} margin="17px 0px">
                        <Field
                            type={passwordVisible ? 'text' : field.type}
                            name={field.name}
                            placeholder={errors[field.name] || field.placeholder}
                            style={errors[field.name] ? { border: '1px solid red', color: 'red' } : {}}
                        />
                        <InputAfter onClick={() => togglePasswordVisible(!passwordVisible)}>
                            <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill={passwordVisible ? colors.active : colors.inactive} d="M11.1562 8.5C11.1562 9.20448 10.8764 9.88011 10.3783 10.3783C9.88011 10.8764 9.20448 11.1562 8.5 11.1562C7.79552 11.1562 7.11989 10.8764 6.62175 10.3783C6.1236 9.88011 5.84375 9.20448 5.84375 8.5C5.84375 7.79552 6.1236 7.11989 6.62175 6.62175C7.11989 6.1236 7.79552 5.84375 8.5 5.84375C9.20448 5.84375 9.88011 6.1236 10.3783 6.62175C10.8764 7.11989 11.1562 7.79552 11.1562 8.5V8.5Z" />
                                <path fill={passwordVisible ? colors.active : colors.inactive} fillRule="evenodd" clipRule="evenodd" d="M0 8.5C0 8.5 3.1875 2.65625 8.5 2.65625C13.8125 2.65625 17 8.5 17 8.5C17 8.5 13.8125 14.3438 8.5 14.3438C3.1875 14.3438 0 8.5 0 8.5ZM8.5 12.2188C9.48627 12.2188 10.4322 11.827 11.1296 11.1296C11.827 10.4322 12.2188 9.48627 12.2188 8.5C12.2188 7.51373 11.827 6.56785 11.1296 5.87045C10.4322 5.17305 9.48627 4.78125 8.5 4.78125C7.51373 4.78125 6.56785 5.17305 5.87045 5.87045C5.17305 6.56785 4.78125 7.51373 4.78125 8.5C4.78125 9.48627 5.17305 10.4322 5.87045 11.1296C6.56785 11.827 7.51373 12.2187 8.5 12.2188V12.2188Z" />
                            </svg>
                        </InputAfter>
                    </FlexBox>
                )
            default:
                return null;
        }
    }

    return (
        <React.Fragment>
            <Formik
                initialValues={initialValues}
                validationSchema={formSchema}
                onSubmit={onSubmit}
            >
                {({ errors }) => (
                    <FormComponent id={id}>
                        {fields.map((i, idx) => renderFields(i, idx, errors))}
                        <PrimaryButton type="submit">{submitText}</PrimaryButton>
                    </FormComponent>
                )}
            </Formik>
        </React.Fragment>
    )
}

export default Form;