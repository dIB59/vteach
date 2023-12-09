import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

// ... (previous imports)

const SignupPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [educationalLevel, setEducationalLevel] = useState(''); // New state for educational level
  const [subjectsOfInterest, setSubjectsOfInterest] = useState(''); // New state for subjects of interest
  const [error, setError] = useState('');

  const handleSignup = () => {
    // First Name, Last Name, and Email validation
    if (!firstName.trim() || !lastName.trim()) {
      setError('First Name and Last Name are required');
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

    // Role-specific validation
    if (role === 'teacher' && !educationalLevel.trim()) {
      setError('Educational Credentials are required for teachers');
      return;
    }

    if (role === 'student' && (!educationalLevel.trim() || !subjectsOfInterest.trim())) {
      setError('Educational Level and Subjects of Interest are required for students');
      return;
    }

    // All validations passed, proceed with signup
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
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </FormControl>
          {role === 'teacher' ? (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Educational Credentials"
              id="educationalLevel"
              value={educationalLevel}
              onChange={(e) => setEducationalLevel(e.target.value)}
            />
          ) : role === 'student' ? (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Educational Level"
                id="educationalLevel"
                value={educationalLevel}
                onChange={(e) => setEducationalLevel(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Subjects of Interest"
                id="subjectsOfInterest"
                value={subjectsOfInterest}
                onChange={(e) => setSubjectsOfInterest(e.target.value)}
              />
            </>
          ) : null}
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
          <Button fullWidth variant="contained" color="primary" onClick={handleSignup}>
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
