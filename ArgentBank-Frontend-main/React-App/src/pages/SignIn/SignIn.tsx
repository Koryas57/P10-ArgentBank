import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../app/feature/authSlice';
import { AppDispatch, RootState} from '../../app/store';
import { Navigation } from '../../components/Navigation/Navigation';
import { Footer } from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';



export const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    // We retrieve the loading, error and authentication state from the store
    const { loading, error , isAuthenticated} = useSelector((state: RootState) => state.auth);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ email, password, rememberMe }));
    };


    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated,navigate]);




    return (
        <>
            <Navigation />
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Email</label>
                            <input
                                type="email"
                                id="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-remember">
                            <input
                                type="checkbox"
                                id="remember-me"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)} // In case of rememberMe checked, we send inverted response of initial state
                            />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button className="sign-in-button" type="submit">
                            {loading ? 'Loading...' : 'Sign In'}
                        </button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
};