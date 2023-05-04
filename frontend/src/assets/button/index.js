import React from "react";
import PropTypes from "prop-types";
import { Button } from '@mui/material';

export const CustomButton = (props) => {
  const {
    children,
    variant,
    classname,
    sx,
    icon,
    onClick,
    type,
    disabled,
    disableRipple,
    ...otherProps
  } = props;
  return (
    <Button 
        variant={variant}
        className={classname}
        sx={sx}
        endIcon={icon} 
        onClick={onClick}
        type={type} 
        disabled={disabled}
        disableRipple={disableRipple}
        {...otherProps}
    >
      {children}
    </Button>
  );
};
CustomButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};


