import {Container, Typography, Box, Button, Grid} from '@mui/material';
import {Link} from 'react-router-dom';

function LandingPage() {
    const imageHeight = 300;

    return (
        <div className="container">
            <Container
                maxWidth="md"

                style={{fontFamily: 'Times New Roman'}}
                sx={{
                    mt: 8,
                    fontFamily: 'Times New Roman',
                    color: '#333',
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    align="center"
                    sx={{fontWeight: 'bold', color: '#2E3B55'}}
                >
                    Разработка психометрического инструментария для диагностики тревоги и депрессии
                </Typography>

                <Grid container spacing={2} alignItems="center" sx={{mt: 4}}>
                    <Grid item xs={12} md={2} sx={{textAlign: 'center'}}>
                        <img
                            src="/img/logo.png"
                            alt="Logo"
                            style={{width: '100%', maxWidth: '120px', objectFit: 'contain'}}
                        />
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            paragraph
                            sx={{mt: 4}}
                        >
                            Стартап-проект поддержан Федеральным государственным бюджетным учреждением «Фонд содействия
                            развитию малых форм предприятий в научно-технической сфере (Фон содействия инновациям)» по
                            итогам конкурса в рамках программы «Студенческий стартап» договор о предоставлении гранта
                            №1260ГССС15-L/88610 от 01.09.2023 г.
                        </Typography>
                    </Grid>
                </Grid>

                <Typography variant="body1" paragraph sx={{fontSize: '1rem', lineHeight: 1.5}}>
                    <strong>Цель стартап-проекта:</strong> Создание специализированного веб-приложения, содержащего
                    тесты, шкалы и опросники, специальным образом разработанные для пожилых пациентов. Приложение
                    направлено на оптимизацию процесса диагностики тревожных и депрессивных расстройств среди пациентов
                    гериатрического профиля, с целью улучшения качества жизни.
                </Typography>

                <Typography variant="h5" component="h2" gutterBottom sx={{mt: 4, color: '#2E3B55'}}>
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
                        <Typography variant="body1" align="center" sx={{mt: 2}}>
                            <strong>Фаттахов Ильяс Маратович:</strong> Исполнитель стартап-проекта, медицинский
                            психолог, ассистент кафедры неврологии и прикладной лингвистики КФУ.
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
                        <Typography variant="body1" align="center" sx={{mt: 2}}>
                            <strong>Горобец Елена Анатольевна:</strong> Научный руководитель, доцент, канд. филол. наук,
                            заведующий кафедрой прикладной и экспериментальной лингвистики КФУ.
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
                        <Typography variant="body1" align="center" sx={{mt: 2}}>
                            <strong>Есин Радий Германович:</strong> Научный консультант, профессор, д-р. мед. наук,
                            профессор кафедры неврологии КГМА.
                        </Typography>
                    </Grid>
                </Grid>

                <Typography variant="body1" paragraph sx={{fontSize: '1rem', lineHeight: 1.5, mt: 4}}>
                    Тревожные и депрессивные расстройства относятся к числу наиболее часто встречающихся форм
                    психических нарушений среди пациентов гериатрического профиля. Как известно, подобные состояния
                    являются значимыми фактором риска развития у таких больных осложнений соматических заболеваний, а
                    также могут приводить к коморбидным состояниям. Таким образом, всё больше возрастает необходимость в
                    своевременной и эффективной диагностике тревожно-депрессивных расстройств среди гериатрических
                    пациентов. Специализированное веб-приложение, содержащее тесты, шкалы и опросники, специальным
                    образом разработанные для пожилых пациентов, способно оптимизировать процесс такой диагностики в
                    общемедицинской практике.
                </Typography>

                <Typography variant="body1" paragraph sx={{fontSize: '1rem', lineHeight: 1.5, mt: 4}}>
                    <strong>Актуальность стартап-проекта:</strong> В случае с пациентами гериатрического профиля в
                    качестве диагностического скрининга уровня тревоги и депрессии преимущественно используются
                    общемедицинские шкалы, у большинства из которых отсутствует нозологическая специфичность и
                    соответствующая валидность относительно гериатрической практики. Таким образом, всё больше
                    возрастает необходимость в разработке веб-приложений, содержащих валидный психометрический
                    инструментарий для скрининга тревожных и депрессивных расстройств у пациентов гериатрического
                    профиля, с учётом факторов, специфичных для данной группы больных.
                </Typography>

                <Typography variant="h5" component="h2" gutterBottom sx={{mt: 4, color: '#2E3B55'}}>
                    Основные конкурентные преимущества стартап-проекта
                </Typography>

                <Typography variant="body1" paragraph sx={{fontSize: '1rem', lineHeight: 1.5}}>
                    Уникальность. На данный момент психометрического инструментария (без зарубежного копирайта), а также
                    веб-приложений, подобных заявленному, в клинической практике для русскоязычных пациентов
                    гериатрического профиля нет.
                </Typography>

                <Typography variant="h5" component="h2" gutterBottom sx={{mt: 4, color: '#2E3B55'}}>
                    Психометрический инструментарий
                </Typography>

                <ul style={{listStyleType: 'disc', paddingLeft: 20}}>
                    <li>
                        <Typography variant="body1">
                            <strong>Шкала Кэрролла для оценки депрессии (CRS):</strong> Опросник, содержащий 52
                            утверждения с ответами «да» или «нет».
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            <strong>Шкала депрессии, тревоги и стресса (DASS):</strong> Шкала с 42 утверждениями,
                            оценивающая интенсивность проявлений от «0» до «3».
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            <strong>Гериатрическая шкала тревоги:</strong> Опросник с 20 утверждениями, направленный на
                            диагностический скрининг тревожных расстройств.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            <strong>Гериатрическая шкала депрессии:</strong> Опросник с 20 утверждениями, направленный
                            на диагностический скрининг депрессивных расстройств.
                        </Typography>
                    </li>
                </ul>

                <Box sx={{mt: 4, textAlign: 'center'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/login"
                        sx={{fontSize: '1rem', fontWeight: 'bold', fontFamily: '"Times New Roman", Times, serif'}}
                    >
                        Перейти к веб-приложению
                    </Button>
                </Box>

                <Box sx={{mt: 4, mb: 4}}>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        align="center"
                        sx={{fontSize: '0.875rem', lineHeight: 1.5, fontFamily: '"Times New Roman", Times, serif'}}
                    >
                        ООО «ПСИХОМЕТРИЧЕСКИЙ ИНСТРУМЕНТАРИЙ», 420004, Респ. Татарстан, г. Казань. E-mail:
                        im.fattahoff@gmail.com
                    </Typography>
                </Box>
            </Container>
        </div>
    );
}

export default LandingPage;
