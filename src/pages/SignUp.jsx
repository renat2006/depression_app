import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    email: Yup.string()
        .email('Некорректный email')
        .required('Email обязателен'),
    password: Yup.string()
        .matches(
            /^[A-Z][a-zA-Z0-9!@#$%^&*()_+=-]{7,}$/,
            'Пароль должен начинаться с заглавной буквы и содержать только латиницу'
        )
        .min(8, 'Пароль должен быть минимум 8 символов')
        .required('Пароль обязателен'),
});

export default function SignUp() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: values.email,
                    password: values.password,
                }),
            });

            const result = await response.json();


            if (response.status !== 201) {
                setErrors({ form: result.message });

            } else {
                console.log('User registered successfully');
                setMessage(result.message);

                navigate('/login');
            }
        } catch (error) {
            setErrors({ form: 'Ошибка соединения с сервером' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form noValidate>
                            <Box sx={{ mt: 2, width: '100%' }}>
                                {errors.form && <Alert severity="error" sx={{ mt: 2 }}>{errors.form}</Alert>}
                                {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
                            </Box>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        name="email"
                                        type="email"
                                        label="Email"
                                        helperText={touched.email ? errors.email : ''}
                                        error={touched.email && Boolean(errors.email)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        name="password"
                                        type="password"
                                        label="Пароль"
                                        helperText={touched.password ? errors.password : ''}
                                        error={touched.password && Boolean(errors.password)}
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
                                Зарегистрироваться
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Уже есть аккаунт? Войти
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}
