import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import Cookies from "js-cookie";

import { Link, Navigate } from 'react-router-dom';


import {Colors} from '../../assets/themes/colors'

const Layout = () => {

  const handleLogout = () => {
    Cookies.remove("token");
    Navigate("/")
  }

  return (
    <div>
      <AppBar position="static" sx={{background: Colors.primary}}>
        <Toolbar>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Button component={Link} to="/home/invoice" color="inherit">
            Search Invoice
          </Button>
          <Button component={Link} to="/home/invoices" color="inherit">
            All Invoices
          </Button>
          <Button component={Link} onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Layout;
