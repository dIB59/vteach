import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Grid } from '@mui/material';



const SignupPage = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    // Full Name should not be empty
    if (!fullName.trim()) {
      setError('Full Name is required');
      return;
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }
  
    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Invalid password format');
      return;
    }
  
    // Confirm Password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
    <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5">Sign up</Typography>
      <form sx={{ width: '100%', mt: 3 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="fullName"
          label="Full Name"
          name="fullName"
          autoComplete="fullName"
          autoFocus
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSignup}
        >
          Sign up
        </Button>
      </form>
      <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
        <Grid item>
          <Link to="/" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Paper>
  </Container>
);
};


export default SignupPage;
