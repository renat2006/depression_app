import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './components/Header';

import SignUp from './pages/SignUp';
import {AuthContext, AuthProvider} from './providers/AuthProvider';

import AddPatient from './components/AddPatient';
import TestLinks from './components/TestLinks';
import TestForm from './components/TestForm';
import AdminPanel from "./components/PatientList.jsx";
import TestResults from "./components/TestResults.jsx";
import Login from "./pages/LogIn.jsx";


function App() {
    return (
        <AuthProvider>
            <Router>
                <CssBaseline/>
                <Header/>
                <Container sx={{mt: 4}}>
                    <Routes>

                        <Route path="/add-patient" element={<PrivateRoute component={<AddPatient/>}/>}/>
                        <Route path="/patients/:patientUuid/tests" element={<PrivateRoute component={<TestLinks/>}/>}/>
                        <Route path="/test/:patientUuid/:testId" element={<TestForm/>}/>
                        <Route path="/patients/:patientUuid/results"
                               element={<PrivateRoute component={<TestResults/>}/>}/>
                        <Route path="/patients" element={<PrivateRoute component={<AdminPanel/>}/>}/>
                        <Route path="/login" element={<LoginRoute/>}/>
                        <Route path="/signup" element={<SignUpRoute/>}/>
                        <Route path="/" element={<Navigate to="/patients"/>}/>
                    </Routes>
                </Container>
            </Router>
        </AuthProvider>
    );
}

function PrivateRoute({component}) {
    const {accessToken} = React.useContext(AuthContext);

    return accessToken ? component : <Navigate to="/login"/>;
}

function LoginRoute() {
    const {accessToken} = React.useContext(AuthContext);

    return accessToken ? <Navigate to="/patients"/> : <Login/>;
}

function SignUpRoute() {
    const {accessToken} = React.useContext(AuthContext);

    return accessToken ? <Navigate to="/patients"/> : <SignUp/>;
}

export default App;
