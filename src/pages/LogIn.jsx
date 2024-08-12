import {useContext} from 'react';
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
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {AuthContext} from "../providers/AuthProvider.jsx";

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Некорректный email')
        .required('Email обязателен'),
    password: Yup.string()
        .min(8, 'Пароль должен быть минимум 8 символов')
        .required('Пароль обязателен'),
});

export default function Login() {
    const {login, loading, authError} = useContext(AuthContext);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={validationSchema}
                    onSubmit={async (values, {setSubmitting, setErrors}) => {
                        const result = await login(values.email, values.password);
                        if (!result.success) {
                            setErrors({form: result.message});
                        }
                        setSubmitting(false);
                    }}
                >
                    {({errors, touched, isSubmitting}) => (
                        <Form noValidate>
                            <Box sx={{mt: 2, mb:3, width: '100%'}}>
                                {(errors.form || authError) && (
                                    <Alert severity="error" sx={{mt: 2, mb:3}}>
                                        {errors.form || authError}
                                    </Alert>
                                )}
                                {loading && <Alert severity="info" sx={{mt: 2}}>Загрузка...</Alert>}
                            </Box>
                            <Grid container spacing={2}>
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
                                sx={{mt: 3, mb: 2}}
                                disabled={isSubmitting || loading}
                            >
                                Войти
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        Нет аккаунта? Зарегистрироваться
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
