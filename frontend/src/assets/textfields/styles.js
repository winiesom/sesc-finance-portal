/** @jsxRuntime classic */
/** @jsx jsx */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import FormHelperText from "@mui/material/FormHelperText";
import { Colors } from "../themes/colors";
import { Fonts } from "../themes/fonts";


export const FormHelper = styled(FormHelperText)`
color: ${Colors.buttonError};
margin-top: -15px;
font: normal normal normal 0.6rem/18px ${Fonts.primary};
`;

export const InputElWrapper = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: 0;

  ${(props) =>
    props.active &&
    css`
      label {
        color: ${Colors.primary};
      }
    `}

  ${(props) =>
    props.disabled &&
    css`
      &,
      label,
      input {
        cursor: not-allowed;
      }
      label {
        color: "#e8ebee";
      }
    `}

  ${(props) =>
    props.error &&
    css`
      label {
        color: ${Colors.buttonError};
      }
    `}

  ${(props) =>
    props.custom &&
    css`
      position: relative;
    `}
`;

// text input
export const InputTextElement = styled.input`
  width: "100%";
  height: 10px;
  margin-bottom: 20px;
  padding: 10px;
  font: normal normal normal 12px/10px ${Fonts.primary};
  border: ${(props) =>
    props.disabled
      ? "1px solid #e8ebee"
      : props.error
      ? `1px solid ${Colors.buttonError}`
      : `1px solid ${Colors.borderColor}`};
  border-radius: 5px;
  background: ${(props) =>
    props.disabled ? "#fcfdfe" : "#FFFFFF 0% 0% no-repeat padding-box"};
  color: ${(props) =>
    props.disabled ? "rgba(0, 0, 0, 0.38)" : Colors.textColor};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  position: relative;
  &:hover {
    border: ${(props) =>
      props.disabled
        ? "1px solid #e8ebee"
        : props.error
        ? `1px solid ${Colors.buttonError}`
        : `1px solid ${Colors.primary}`};
    outline: none;
  }
  &:focus {
    outline: none;
  }
  :focus-within {
    border: ${(props) =>
      props.disabled
        ? "1px solid #e8ebee"
        : props.error
        ? `1px solid ${Colors.buttonError}`
        : `1px solid ${Colors.primary}`};
    outline: none;
  }
  ::placeholder {
    color: #bababa;
    font: normal normal normal 12px/10px ${Fonts.primary};
  }
`;

// input label
export const InputLabel = styled.label`
  margin-bottom: 10px;
  display: block;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
  text-align: left;
  font: normal normal 600 12px/4px ${Fonts.primary};
  letter-spacing: 0px;
  color: ${Colors.labelColor};
  text-transform: capitalize;
`;