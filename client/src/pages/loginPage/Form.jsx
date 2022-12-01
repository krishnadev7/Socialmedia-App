// React && Redux && React-Router imports
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// components and redux store imports
import FLexBetween from '../../components/FlexBetween';
import { SetLogin } from '../../redux/store';

// mui icon imports
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

// Yup & formik & react-dropzone imports for form validation
import * as yup from 'yup';
import { Formik } from 'formik';
import Dropzone from 'react-dropzone';
import { Box } from '@mui/system';
import { TextField, Typography } from '@mui/material';

const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastname: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
  location: yup.string().required('required'),
  occupation: yup.string().required('required'),
  picture: yup.string().required('required'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});

const initialValueRegister = {
  firstName: '',
  lastname: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: '',
};

const initialValueLogin = {
  email: '',
  password: '',
};

const Form = () => {
  const [pageType, setPageType] = useState('login');
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';

  const handleFormSubmit = async () => {};

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValueLogin : initialValueRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        resetForm,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='reapeat(4,minmax(0,1fr))'
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label={firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name='firstname'
                  error={
                    Boolean(touched.firstname) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstname}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label={lastname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastname}
                  name='lastname'
                  error={Boolean(touched.lastname) && Boolean(errors.lastname)}
                  helperText={touched.lastname && errors.lastname}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label={location}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name='location'
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label={occupation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name='occupation'
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: 'span 4' }}
                />
                <Box
                  gridColumn='span 4'
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius='5px'
                  p='1rem'
                >
                  <Dropzone
                    acceptedFiles='.jpg,.jpeg,.png'
                    multiple={false}
                    onDrop={acceptedFiles => {
                      setFieldValue('picture', acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p='1rem'
                        sx={{ '$:hover': { cursor: 'pointer' } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ):(
                          <FLexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutLinedIcon/>
                          </FLexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
