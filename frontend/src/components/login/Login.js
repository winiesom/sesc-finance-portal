import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Paper, Grid } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { CustomButton } from "../../assets/button"
import { PasswordField, TextField } from "../../assets/textfields";
import Snackbars from "../../assets/snackbar";
import { Colors } from "../../assets/themes/colors"

import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../slices/auth'
import { clearMessage } from "../../slices/message";


import '../../styles/auth.styles.css'
import '../../styles/common.styles.css'


const Login = () => {
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm(formOptions);
    
    const onSubmit = (data) => {
      const { email, password } = data;
      setLoading(true);
      
    
      const loginData = {
        email,
        password,
      };
    
      dispatch(login(loginData))
        .then((data) => {
          setLoading(false);
          if (data.payload !== undefined) {
            navigate('/home/invoice');
          }
        })
        .catch(() => {
          setLoading(false);
        });
    
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return false;
    };
    


  return (
    <div className="login-container">
    <Snackbars
      variant="error"
      message={message}
      isOpen={message !== undefined && message !== ""}
    />
    
    <Paper elevation={3} className="reg-container">
     <div className={`${"title"} ${"title-style"}`}>Login</div>
     <form onSubmit={handleSubmit(onSubmit)}>
     <Grid container spacing={2} className="textfield-grid-container">

          <Grid item xs={12} className="textfield-grid">
            <TextField 
              id="email"
              htmlFor="email"
              label="Email"
              name="email"
              error={errors.email ? true : false}
              helper={errors.email?.message}
              register={register}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} className="textfield-grid">
            <PasswordField 
                id="password"
                htmlFor="password"
                name="password"
                type="password"
                label="Password"
                register={register}
                error={errors.password ? true : false}
                helper={errors.password?.message}
                disabled={loading}
            />
          </Grid>

          <Grid item xs={12} className="textfield-grid">
            <CustomButton
             variant="contained"
             sx={{ background: Colors.primary}}
             className="submitBtn"
             endIcon={ <HowToRegIcon/>} 
             type="submit" 
             disabled={loading}
            >
              {loading ? (
                <ThreeDots color="#2e3192" height={15} width={30} />
              ) : (
                "Log in"
              )}
            </CustomButton>
          </Grid>
      </Grid>
     </form>

    </Paper>

  

  </div>
  );
}

export default Login