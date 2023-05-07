import React from "react";
import PropTypes from "prop-types";

import {
    FormHelper,
    InputElWrapper,
    InputTextElement,
    InputLabel
  } from "./styles";


export function TextField({
  type,
  id,
  htmlFor,
  classname,
  name,
  min,
  max,
  value,
  label,
  helper,
  onChange,
  disabled,
  register,
  readonly,
  ...otherProps
}) {
  return (
    <InputElWrapper>
      <InputLabel htmlFor={htmlFor}>{label}</InputLabel>
      {register ? (
        <InputTextElement
          id={id}
          name={name}
          className={classname}
          value={value}
          label={label}
          type={type}
          min={min}
          max={max}
          onChange={onChange}
          disabled={disabled}
          readOnly={readonly}
          {...otherProps}
          {...register(name)}
        />
      ) : (
        <InputTextElement
          id={id}
          name={name}
          value={value}
          label={label}
          type={type}
          min={min}
          max={max}
          onChange={onChange}
          disabled={disabled}
          readOnly={readonly}
          {...otherProps}
        />
      )}
      <FormHelper>{helper}</FormHelper>
    </InputElWrapper>
  );
}


export function PasswordField({
  id,
  name,
  classname,
  htmlFor,
  helper,
  label,
  type,
  onChange,
  value,
  onClick,
  disabled,
  register,
  ...otherProps
}) {
  return (
      <InputElWrapper>
        <InputLabel htmlFor={htmlFor}>{label}</InputLabel>
        {register ? (
          <>
            <InputTextElement
              id={id}
              name={name}
              classname={classname}
              label={label}
              type={type}
              value={value}
              disabled={disabled}
              onChange={onChange}
              {...otherProps}
              {...register(name)}
            />
            <FormHelper>{helper}</FormHelper>
          </>
        ) : (
          <>
            <InputTextElement
              id={id}
              name={name}
              label={label}
              type={type}
              value={value}
              disabled={disabled}
              onChange={onChange}
              {...otherProps}
            />
            <FormHelper>{helper}</FormHelper>
          </>
        )}
      </InputElWrapper>
  );
}

PasswordField.propTypes = {
  name: PropTypes.string,
};

