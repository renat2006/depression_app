import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function LandingPage() {
    const imageHeight = 400;

    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
                Разработка психометрического инструментария для диагностики тревоги и депрессии
            </Typography>
            <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <img
                        src="/img/mi.jpg"
                        alt="Diagnostics"
                        style={{
                            width: '100%',

                            objectFit: 'cover',
                            borderRadius: 8,
                        }}
                    />
                </Grid>
            </Grid>
            <Typography variant="subtitle1" align="center" paragraph sx={{ mt: 4 }}>
                Стартап-проект поддержан Федеральным государственным бюджетным учреждением «Фонд содействия развитию малых форм предприятий в научно-технической сфере (Фон содействия инновациям)» по итогам конкурса в рамках программы «Студенческий стартап».
            </Typography>
            <Typography variant="body1" paragraph>
                <strong>Цель стартап-проекта:</strong> Создание специализированного веб-приложения, содержащего тесты, шкалы и опросники, специальным образом разработанные для пожилых пациентов. Приложение направлено на оптимизацию процесса диагностики тревожных и депрессивных расстройств среди пациентов гериатрического профиля, с целью улучшения качества жизни.
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Команда стартап-проекта
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                    <img
                        src="/img/pi1.jpg"
                        alt="Ильяс Маратович"
                        style={{
                            width: '100%',
                            height: `${imageHeight}px`,
                            objectFit: 'cover',
                            borderRadius: 8,
                        }}
                    />
                    <Typography variant="body1" align="center">
                        <strong>Фаттахов Ильяс Маратович:</strong> Исполнитель стартап-проекта, медицинский психолог, ассистент кафедры неврологии и прикладной лингвистики КФУ.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <img
                        src="/img/pi2.jpg"
                        alt="Елена Анатольевна"
                        style={{
                            width: '100%',
                            height: `${imageHeight}px`,
                            objectFit: 'cover',
                            borderRadius: 8,
                        }}
                    />
                    <Typography variant="body1" align="center">
                        <strong>Горобец Елена Анатольевна:</strong> Научный руководитель, доцент, канд. филол. наук, заведующий кафедрой прикладной и экспериментальной лингвистики КФУ.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <img
                        src="/img/pi3.jpg"
                        alt="Радий Германович"
                        style={{
                            width: '100%',
                            height: `${imageHeight}px`,
                            objectFit: 'cover',
                            borderRadius: 8,
                        }}
                    />
                    <Typography variant="body1" align="center">
                        <strong>Есин Радий Германович:</strong> Научный консультант, профессор, д-р. мед. наук, профессор кафедры неврологии КГМА.
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                Психометрический инструментарий
            </Typography>
            <ul>
                <li>
                    <Typography variant="body1">
                        <strong>Шкала Кэрролла для оценки депрессии (CRS):</strong> Опросник, содержащий 52 утверждения с ответами «да» или «нет».
                    </Typography>
                </li>
                <li>
                    <Typography variant="body1">
                        <strong>Шкала депрессии, тревоги и стресса (DASS):</strong> Шкала с 42 утверждениями, оценивающая интенсивность проявлений от «0» до «3».
                    </Typography>
                </li>
                <li>
                    <Typography variant="body1">
                        <strong>Гериатрическая шкала тревоги:</strong> Опросник с 20 утверждениями, направленный на диагностический скрининг тревожных расстройств.
                    </Typography>
                </li>
                <li>
                    <Typography variant="body1">
                        <strong>Гериатрическая шкала депрессии:</strong> Опросник с 20 утверждениями, направленный на диагностический скрининг депрессивных расстройств.
                    </Typography>
                </li>
            </ul>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button variant="contained" color="primary" component={Link} to="/login">
                    Перейти к веб-приложению
                </Button>
            </Box>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="body2" color="textSecondary" align="center">
                    ООО «ПСИХОМЕТРИЧЕСКИЙ ИНСТРУМЕНТАРИЙ», 420004, Респ. Татарстан, г. Казань. E-mail: im.fattahoff@gmail.com
                </Typography>
            </Box>
        </Container>
    );
}

export default LandingPage;
