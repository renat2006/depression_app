import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token') || null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token') || null);
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState('');


    const login = async (email, password) => {
        setLoading(true);
        setAuthError('');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login: email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setAccessToken(data.access_token);
                setRefreshToken(data.refresh_token);
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                console.log('User logged in successfully');
                return { success: true };
            } else {
                let errorMessage = 'Ошибка аутентификации';
                if (response.status === 400) {
                    errorMessage = 'Неправильный запрос. Проверьте данные для входа.';
                } else if (response.status === 401) {
                    errorMessage = 'Неправильный email или пароль.';
                } else if (response.status === 500) {
                    errorMessage = 'Ошибка сервера. Пожалуйста, попробуйте позже.';
                } else {
                    errorMessage = data.message || errorMessage;
                }
                setAuthError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (error) {
            const networkErrorMessage = 'Ошибка сети. Попробуйте снова.';
            setAuthError(networkErrorMessage);
            return { success: false, message: networkErrorMessage };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        console.log('User logged out');

    };

    const refreshAccessToken = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setAccessToken(data.access_token);
                localStorage.setItem('access_token', data.access_token);
                console.log('Access token refreshed');
            } else {
                console.error('Failed to refresh access token:', data.message);
                logout();
            }
        } catch (error) {
            console.error('Refresh token error:', error);
            logout();
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (refreshToken) {
                refreshAccessToken();
            }
        }, 14 * 60 * 1000);

        return () => clearInterval(interval);
    }, [refreshToken]);

    const fetchWithAuth = async (url, options = {}) => {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status === 401) {
            console.log('Unauthorized, logging out...');
            logout();
        }

        return response;
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, loading, fetchWithAuth, authError }}>
            {children}
        </AuthContext.Provider>
    );
};
