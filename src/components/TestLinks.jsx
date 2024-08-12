import { useParams} from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    Box,
    Grid,
    Paper,
} from '@mui/material';

function TestLinks() {
    const { patientUuid } = useParams();

    const generateTestLink = (testId) => {
        return `${window.location.origin}/test/${patientUuid}/${testId}`;
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Ссылки на тесты
            </Typography>
            <Box component={Paper} sx={{ p: 3, mb: 2 }}>
                <Typography variant="body1">
                    Отправьте ссылки пациенту для выполнения тестов.
                </Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {[1, 2, 3, 4].map((testId) => (
                        <Grid item key={testId} xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                component="a"
                                href={generateTestLink(testId)}
                            >
                                Тест {testId}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default TestLinks;
