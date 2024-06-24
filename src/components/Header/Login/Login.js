import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    gap: '10px',
  },
  button: {
    marginTop: '10px',
  },
  formControl: {
    minWidth: 120,
  },
});

const Login = ({ onLoginSuccess }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState('91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = () => {
    if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error('Invalid phone number. Please enter a 10-digit number.');
      return;
    }
    // Simulate OTP generation and sending logic
    toast.success('OTP sent successfully.');
    setOtpSent(true);
  };

  const handleOtpSubmit = () => {
    // Implement your OTP validation logic here
    if (otp === '123456') {
      toast.success('Login successful.');
      onLoginSuccess();
      navigate('/');
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h2>Log in or sign up</h2>
      <p>Welcome to Airbnb</p>
      <FormControl className={classes.formControl}>
        <InputLabel id="country-code-label">Country Code</InputLabel>
        <Select
          labelId="country-code-label"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        >
          <MenuItem value="91">India (+91)</MenuItem>
          {/* Add more country codes as needed */}
        </Select>
      </FormControl>
      <TextField
        label="Phone Number"
        variant="outlined"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      {otpSent && (
        <TextField
          label="OTP"
          variant="outlined"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      )}
      {!otpSent ? (
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Generate OTP
        </Button>
      ) : (
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleOtpSubmit}
        >
          Submit
        </Button>
      )}
      <p>Or</p>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        startIcon={<FacebookIcon />}
      >
        Continue with Facebook
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        startIcon={<GoogleIcon />}
      >
        Continue with Google
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        startIcon={<AppleIcon />}
      >
        Continue with Apple
      </Button>
    
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button className={classes.button} color="primary">
          Cancel
        </Button>
      </Link>
    </div>
  );
};

export default Login;
