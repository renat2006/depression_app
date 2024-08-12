import {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Typography,

    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
    Grid,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {AuthContext} from "../providers/AuthProvider.jsx";

function AdminPanel() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { fetchWithAuth } = useContext(AuthContext);
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetchWithAuth(`${import.meta.env.VITE_API_HOST}/patients`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Не удалось загрузить пациентов');
                }

                const data = await response.json();

                setPatients(Object.entries(data.patients || {}));
                setLoading(false);
            } catch (error) {
                setError(error.message || 'Ошибка загрузки пациентов');
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    const handleAddPatient = () => {

        window.location.href = '/add-patient';
    };

    const generateTestLink = (patientUuid, testId) => {
        return `/test/${patientUuid}/${testId}`;
    };

    const translateGender = (gender) => {
        return gender === 'MALE' ? 'Мужчина' : 'Женщина';
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Управление пациентами
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAddPatient} sx={{ mb: 2 }}>
                Добавить пациента
            </Button>
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table size={isMobile ? 'small' : 'medium'}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Имя</TableCell>
                            <TableCell>Дата рождения</TableCell>
                            <TableCell>Пол</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.map(([id, patient]) => (
                            <TableRow key={id}>
                                <TableCell>{patient.full_name}</TableCell>
                                <TableCell>{new Date(patient.birthday_date).toLocaleDateString('ru-RU')}</TableCell>
                                <TableCell>{translateGender(patient.gender)}</TableCell>
                                <TableCell>
                                    <Grid container spacing={1} direction={isMobile ? 'column' : 'row'}>
                                        {[1, 2, 3, 4].map((testId) => (
                                            <Grid item key={testId}>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    color="primary"
                                                    component={Link}
                                                    to={generateTestLink(patient.uuid, testId)}
                                                >
                                                    Тест {testId}
                                                </Button>
                                            </Grid>
                                        ))}
                                        <Grid item>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="secondary"
                                                component={Link}
                                                to={`/patients/${patient.uuid}/results`}
                                            >
                                                Результаты
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default AdminPanel;
