import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    CircularProgress,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Grid,
    Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { green, orange, red, grey } from '@mui/material/colors';
import { AuthContext } from "../providers/AuthProvider.jsx";

function TestResults() {
    const { patientUuid } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [results, setResults] = useState({});
    const { fetchWithAuth } = useContext(AuthContext);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetchWithAuth(`${import.meta.env.VITE_API_HOST}/tests/${patientUuid}`);
                if (!response.ok) {
                    throw new Error('Не удалось загрузить результаты тестов');
                }
                const data = await response.json();
                console.log(data);
                delete data.status;
                setResults(data);
            } catch (err) {
                setError(err.message || 'Ошибка при загрузке результатов тестов');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [patientUuid]);

    const interpretResult = (testId, score) => {
        if (score === -1 || (Array.isArray(score) && score.every(s => s === -1))) return "Тест не проводился";

        let interpretation = '';
        switch (testId) {
            case "3": // Geriatric Anxiety Scale
                interpretation = score <= 3 ? "Отсутствие тревоги" : "Вероятная тревога";
                break;
            case "4": // Geriatric Depression Scale
                interpretation = score <= 3 ? "Отсутствие депрессии" : "Вероятная депрессия";
                break;
            case "1": // Carroll Rating Scale for Depression
                if (score <= 7) interpretation = "Норма";
                else if (score <= 13) interpretation = "Лёгкое депрессивное расстройство";
                else if (score <= 18) interpretation = "Депрессивное расстройство средней степени тяжести";
                else if (score <= 22) interpretation = "Депрессивное расстройство тяжелой степени";
                else interpretation = "Депрессивное расстройство крайне тяжёлой степени";
                break;
            case "2": // Depression, Anxiety, and Stress Scale
                if (Array.isArray(score)) {
                    const [depression, anxiety, stress] = score;
                    interpretation = (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Chip
                                    label={`Депрессия: ${depression}`}
                                    sx={{ backgroundColor: depressionColor(depression), color: 'white', marginRight: 1 }}
                                />
                                {depressionInterpretation(depression)}
                            </Grid>
                            <Grid item xs={12}>
                                <Chip
                                    label={`Тревога: ${anxiety}`}
                                    sx={{ backgroundColor: anxietyColor(anxiety), color: 'white', marginRight: 1 }}
                                />
                                {anxietyInterpretation(anxiety)}
                            </Grid>
                            <Grid item xs={12}>
                                <Chip
                                    label={`Стресс: ${stress}`}
                                    sx={{ backgroundColor: stressColor(stress), color: 'white', marginRight: 1 }}
                                />
                                {stressInterpretation(stress)}
                            </Grid>
                        </Grid>
                    );
                } else {
                    interpretation = "Данные отсутствуют";
                }
                break;
            default:
                interpretation = "Неизвестный тест";
        }
        return interpretation;
    };

    const getResultIcon = (testId, score) => {
        if (score === -1 || (Array.isArray(score) && score.every(s => s === -1))) return <NotInterestedIcon sx={{ color: grey[500] }} />;

        let IconComponent = CheckCircleIcon;
        let iconColor = green[500];
        switch (testId) {
            case "3":
            case "4":
                if (score > 3) {
                    IconComponent = ErrorIcon;
                    iconColor = red[500];
                }
                break;
            case "1":
                if (score > 13 && score <= 18) {
                    IconComponent = WarningIcon;
                    iconColor = orange[500];
                } else if (score > 18) {
                    IconComponent = ErrorIcon;
                    iconColor = red[500];
                }
                break;
            case "2":
                const [depression, anxiety, stress] = score;
                if (depression > 9 || anxiety > 7 || stress > 14) {
                    IconComponent = WarningIcon;
                    iconColor = orange[500];
                }
                if (depression > 13 || anxiety > 9 || stress > 18) {
                    IconComponent = ErrorIcon;
                    iconColor = red[500];
                }
                break;
            default:
                break;
        }
        return <IconComponent sx={{ color: iconColor }} />;
    };

    const depressionInterpretation = (value) => {
        return value <= 9 ? "Норма" :
            value <= 13 ? "Легкая степень" :
                value <= 20 ? "Умеренная степень" :
                    value <= 27 ? "Тяжелая степень" :
                        "Крайне тяжелая степень";
    };

    const anxietyInterpretation = (value) => {
        return value <= 7 ? "Норма" :
            value <= 9 ? "Легкая степень" :
                value <= 14 ? "Умеренная степень" :
                    value <= 19 ? "Тяжелая степень" :
                        "Крайне тяжелая степень";
    };

    const stressInterpretation = (value) => {
        return value <= 14 ? "Норма" :
            value <= 18 ? "Легкая степень" :
                value <= 25 ? "Умеренная степень" :
                    value <= 33 ? "Тяжелая степень" :
                        "Крайне тяжелая степень";
    };

    const depressionColor = (value) => {
        return value <= 9 ? green[500] :
            value <= 13 ? orange[500] :
                red[500];
    };

    const anxietyColor = (value) => {
        return value <= 7 ? green[500] :
            value <= 9 ? orange[500] :
                red[500];
    };

    const stressColor = (value) => {
        return value <= 14 ? green[500] :
            value <= 18 ? orange[500] :
                red[500];
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Результаты тестов
            </Typography>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {!loading && !error && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Тест</TableCell>
                                <TableCell>Результат</TableCell>
                                <TableCell>Интерпретация</TableCell>
                                <TableCell>Инфо</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(results).map(([testId, score]) => (
                                <TableRow key={testId}>
                                    <TableCell>Тест {testId}</TableCell>
                                    <TableCell>
                                        {score === -1 || (Array.isArray(score) && score.every(s => s === -1))
                                            ? "Н/Д"
                                            : Array.isArray(score) ? score.join(', ') : score}
                                    </TableCell>
                                    <TableCell>{interpretResult(testId, score)}</TableCell>
                                    <TableCell>
                                        <Box display="flex">
                                            {getResultIcon(testId, score)}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}

export default TestResults;
