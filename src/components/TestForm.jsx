import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    CircularProgress,
    Alert,
    Grid,
} from '@mui/material';
import { AuthContext } from "../providers/AuthProvider.jsx";

function TestForm() {
    const { patientUuid, testId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [testName, setTestName] = useState('');
    const { fetchWithAuth } = useContext(AuthContext);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetchWithAuth(`/data/test${testId}.json`);
                if (!response.ok) {
                    throw new Error('Не удалось загрузить вопросы теста');
                }
                const data = await response.json();
                setTestName(data.title);
                setQuestions(data.questions);
                setOptions(data.options);
                setAnswers(new Array(data.questions.length).fill(null));
            } catch (err) {
                setError(err.message || 'Ошибка при загрузке вопросов теста');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [testId]);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetchWithAuth(`${import.meta.env.VITE_API_HOST}/tests/${patientUuid}/${testId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ patient_uuid: patientUuid, answers }),
            });

            if (!response.ok) {
                throw new Error('Не удалось сохранить результаты теста');
            }

            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Ошибка при сохранении результатов теста');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = parseInt(value, 10);
        setAnswers(updatedAnswers);
    };

    const goToNextQuestion = () => {
        if (answers[currentQuestion] !== null && currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 100px)',
            }}
        >
            <Typography variant="h5" gutterBottom>
                {testName}
            </Typography>
            {loading && <CircularProgress />}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success ? (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Результаты успешно сохранены!
                    </Alert>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 4 }}
                        onClick={() => navigate('/patients')}
                    >
                        Вернуться к списку пациентов
                    </Button>
                </Box>
            ) : (
                questions.length > 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mt: 4,
                        }}
                    >
                        <Typography align="center" sx={{ fontSize: '1.2rem', fontWeight: 'medium', mb: 2 }}>
                            {questions[currentQuestion]}
                        </Typography>
                        <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
                            <RadioGroup
                                row={options.length === 2}
                                aria-label={`question-${currentQuestion + 1}`}
                                name={`question-${currentQuestion + 1}`}
                                value={
                                    answers[currentQuestion] !== null
                                        ? answers[currentQuestion].toString()
                                        : ''
                                }
                                onChange={(e) => handleAnswerChange(e.target.value)}
                            >
                                <Grid
                                    container
                                    spacing={options.length === 2 ? 2 : 0}
                                    justifyContent={options.length === 2 ? 'center' : 'flex-start'}
                                >
                                    {options.map((option, index) => (
                                        <Grid
                                            item
                                            xs={options.length === 2 ? 6 : 12}
                                            key={index}
                                            sx={{
                                                textAlign: options.length === 2 ? 'center' : 'left',
                                                display: 'flex',
                                                justifyContent: options.length === 2 ? 'center' : 'flex-start',
                                            }}
                                        >
                                            <FormControlLabel
                                                value={index.toString()}
                                                control={<Radio />}
                                                label={option}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                        <Box sx={{ mt: 4 }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{ mr: 2 }}
                                onClick={goToPreviousQuestion}
                                disabled={currentQuestion === 0}
                            >
                                Назад
                            </Button>
                            {currentQuestion < questions.length - 1 ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={goToNextQuestion}
                                    disabled={answers[currentQuestion] === null}
                                >
                                    Далее
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    disabled={answers.includes(null)}
                                >
                                    Отправить результаты
                                </Button>
                            )}
                        </Box>
                    </Box>
                )
            )}
        </Container>
    );
}

export default TestForm;
