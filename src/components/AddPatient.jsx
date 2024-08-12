import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import {useContext} from "react";
import {AuthContext} from "../providers/AuthProvider.jsx";


const validationSchema = Yup.object({
    full_name: Yup.string().required('Требуется полное имя'),
    birthday_date: Yup.date().required('Требуется дата рождения'),
    comment: Yup.string().required('Требуется комментарий'),
    gender: Yup.string().oneOf(['MALE', 'FEMALE'], 'Требуется пол').required('Требуется пол'),
});

export default function AddPatient() {
    const navigate = useNavigate();
    const { fetchWithAuth } = useContext(AuthContext);

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {

            const formattedData = {
                full_name: values.full_name,
                birthday_date: values.birthday_date,
                comment: values.comment,
                gender: values.gender,
            };

            const response = await fetchWithAuth(`${import.meta.env.VITE_API_HOST}/patients`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            if (response.ok) {
                navigate('/patients');
            } else {
                const errorData = await response.json();
                setErrors({ form: errorData.message || 'Не удалось добавить пациента' });
            }
        } catch {
            setErrors({ form: 'Не удалось добавить пациента' });
        } finally {
            setSubmitting(false);
        }
    };

    const genderOptions = [
        { value: 'MALE', label: 'Мужской' },
        { value: 'FEMALE', label: 'Женский' },
    ];

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Добавить нового пациента
                </Typography>
                <Formik
                    initialValues={{ full_name: '', birthday_date: '', comment: '', gender: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting, setFieldValue }) => (
                        <Form noValidate>
                            <Box sx={{ mt: 2, width: '100%' }}>
                                {errors.form && <Alert severity="error" sx={{ mt: 2 }}>{errors.form}</Alert>}
                            </Box>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        name="full_name"
                                        type="text"
                                        label="Полное имя"
                                        helperText={touched.full_name ? errors.full_name : ''}
                                        error={touched.full_name && Boolean(errors.full_name)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        name="birthday_date"
                                        type="date"
                                        label="Дата рождения"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        helperText={touched.birthday_date ? errors.birthday_date : ''}
                                        error={touched.birthday_date && Boolean(errors.birthday_date)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        name="comment"
                                        type="text"
                                        label="Комментарий"
                                        helperText={touched.comment ? errors.comment : ''}
                                        error={touched.comment && Boolean(errors.comment)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        options={genderOptions}
                                        getOptionLabel={(option) => option.label}
                                        fullWidth
                                        onChange={(event, value) => setFieldValue('gender', value ? value.value : '')}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Пол"
                                                variant="outlined"
                                                error={touched.gender && Boolean(errors.gender)}
                                                helperText={touched.gender ? errors.gender : ''}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={isSubmitting}
                            >
                                Добавить пациента
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}
