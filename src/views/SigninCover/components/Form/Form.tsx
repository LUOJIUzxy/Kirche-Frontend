/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import useAuth from '../../../../hooks/useAuth';
import { NotificationType } from '../../../../enum/notification-type-enum';
import { NotificationService } from '../../../../services/notification-service';

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Please specify your password')
    .min(8, 'The password should have at minimum length of 8'),
});

const Form = (): JSX.Element => {
  const router = useRouter();
  console.log(router);
  const { signIn } = useAuth();
  
  // const initialValues = {
  //   email: '',
  //   password: '',
  // };
  //const formik = useFormik({
  //   initialValues,
  //   validationSchema: validationSchema,
  //   onSubmit,
  // });

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'text.secondary'}
        >
          Login
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Welcome back
        </Typography>
        <Typography color="text.secondary">
          Login to manage the system.
        </Typography>
      </Box>
      <Formik 
        initialValues={{
          username: 'admin',
          password: 'password',
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          // email: Yup.string()
          //   .email("Must be a valid email")
          //   .max(255)
          //   .required("Email is required"),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const state = await signIn(values.username, values.password);
            console.log(state);
            if (!state) {
              //
            } else {
              router.push('/activities');
              
              NotificationService(
                'Welcome!',
                NotificationType.SUCCESS,
                values.username
              );
            }
          } catch (error: any) {
            const message = error.message || 'Something went wrong';
  
            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      > 
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                 Enter your email
                </Typography>
                <TextField
                  label="Username *"
                  variant="outlined"
                  name={'username'}
                  fullWidth
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  // onChange={formik.handleChange}
                  error={Boolean(touched.username && errors.username)} 
                  //error={formik.touched.email && Boolean(formik.errors.email)}
                  // @ts-ignore
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={1}
                  marginBottom={2}
                >
                  <Box marginBottom={{ xs: 1, sm: 0 }}>
                    <Typography variant={'subtitle2'}>
                  Enter your password
                    </Typography>
                  </Box>
                  <Typography variant={'subtitle2'}>
                    <Link
                      component={'a'}
                      color={'primary'}
                      href={'/password-reset-cover'}
                      underline={'none'}
                    >
                  Forgot your password?
                    </Link>
                  </Typography>
                </Box>
                <TextField
                  label="Password *"
                  variant="outlined"
                  name={'password'}
                  type={'password'}
                  fullWidth
                  value={values.password}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  // value={formik.values.password}
                  // onChange={formik.handleChange}
                  // error={formik.touched.password && Boolean(formik.errors.password)}  
                  // helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item container xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={1}
                  maxWidth={600}
                  margin={'0 auto'}
                >
                  <Button size={'large'} variant={'contained'} type={'submit'}>
                    Login
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      
    </Box>
  );
};

export default Form;
