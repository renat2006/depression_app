import {Container, Typography, Box, Button, Grid} from '@mui/material';
import {Link} from 'react-router-dom';

function LandingPage() {
    const imageHeight = 400;

    return (
        <Container maxWidth="md" sx={{mt: 8}}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Разработка психометрического инструментария для диагностики тревоги и
                депрессии у пациентов гериатрического профиля
            </Typography>
            <Grid container spacing={4} justifyContent="center" sx={{mt: 2}}>
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
            <Typography variant="subtitle1" align="center" paragraph sx={{mt: 4}}>
                Стартап-проект поддержан Федеральным государственным бюджетным
                учреждением «Фонд содействия развитию малых форм предприятий в научно-технической сфере
                (Фонд содействия инновациям)» по итогам конкурса в рамках программы «Студенческий стартап»,
                договор о предоставлении гранта <br/><strong>№1260ГССС15-L/88610 от 01.09.2023 г.</strong>
            </Typography>
            <Typography variant="body1" paragraph>
                <strong>Цель стартап-проекта:</strong> создание специализированного веб-приложения,
                содержащего валидный психометрический инструментарий, которое направлено на оптимизацию
                процесса диагностики эмоциональных расстройств среди пациентов пожилого и старческого возраста
                в общемедицинской практике с целью повышения качества жизни последних.
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Команда стартап-проекта
            </Typography>
            <Grid container spacing={2}>
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
                        <strong>Фаттахов Ильяс Маратович: </strong>
                        Исполнитель стартап-проекта,
                        медицинский психолог
                        Университетской клиники КФУ,
                        ассистент кафедры неврологии с
                        курсами психиатрии,
                        клинической психологии и
                        медицинской генетики ИФМиБ
                        КФУ, ассистент кафедры
                        прикладной и
                        экспериментальной лингвистики
                        ИФиМК КФУ, директор ООО
                        «Психометрический
                        инструментарий».
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
                        <strong>Горобец Елена Анатольевна:</strong> Научный руководитель стартап-проекта, доцент, канд. филол.
                        наук, заведующий кафедрой
                        прикладной и
                        экспериментальной
                        лингвистики ИФиМК КФУ,
                        заведующий Центром
                        патологии речи
                        Университетской клиники
                        КФУ, руководитель НИЛ
                        «Нейрокогнитивные
                        исследования» ИФиМК КФУ.
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
                        <strong>Есин Радий Германович:</strong> Научный консультант
                        стартап-проекта, профессор,
                        д-р. мед. наук, профессор
                        кафедры неврологии КГМА
                        – филиала ФГБОУ ДПО
                        РМАНПО Минздрава
                        России, профессор кафедры
                        неврологии с курсами
                        психиатрии, клинической
                        психологии и медицинской
                        генетики ИФМиБ КФУ,
                        Заслуженный врач
                        Росийской Федерации.
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="h5" component="h2" gutterBottom sx={{mt: 4}}>
                Психометрический инструментарий
            </Typography>
            <Typography variant="body1" paragraph>
                Разработанное веб-приложение содержит психометрически и лингвистически валидные
                психодиагностические инструменты – как переводные с английского языка, так и оригинальные
                русскоязычные – и позволяет клиницисту удобно использовать их во время приема, оперативно
                предоставляя количественные результаты для их последующей качественной интерпретации:
            </Typography>
            <ul>
                <li>
                    <Typography variant="body1">
                        <strong>Шкала Кэрролла для оценки депрессии (CRS)</strong> – Автор: B.J. Caroll. Перевод на русский
                        язык: И.М. Фаттахов, Е.А. Горобец
                    </Typography>
                </li>
                <li>
                    <Typography variant="body1">
                        <strong>Шкала депрессии, тревоги и стресса (DASS)</strong> – Авторы: S.H. Lovibond, P.F. Lovibond.
                        Перевод на русский язык: И.М. Фаттахов, Е.А. Горобец.

                    </Typography>
                </li>
                <li>
                    <Typography variant="body1">
                        <strong>Гериатрическая шкала тревоги</strong> – Автор: И.М. Фаттахов.
                    </Typography>
                </li>
                <li>
                    <Typography variant="body1">
                        <strong>Гериатрическая шкала депрессии</strong> – Автор: И.М. Фаттахов.
                    </Typography>
                </li>
            </ul>
            <Box sx={{mt: 4, textAlign: 'center'}}>
                <Button variant="contained" color="primary" component={Link} to="/login">
                    Перейти к веб-приложению
                </Button>
            </Box>
            <Box sx={{mt: 4, mb: 4}}>
                <Typography variant="body2" color="textSecondary" align="center">
                    ООО «ПСИХОМЕТРИЧЕСКИЙ ИНСТРУМЕНТАРИЙ», 420004, Респ. Татарстан, г. Казань. E-mail:

                </Typography>
                <Typography variant="link"  align="center"paragraph>im.fattahoff@gmail.com</Typography>
            </Box>
        </Container>
    );
}

export default LandingPage;
