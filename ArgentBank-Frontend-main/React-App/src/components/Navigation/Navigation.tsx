import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/argentBankLogo.webp';
import { AppDispatch, RootState } from '../../app/store';
import { logout } from '../../app/feature/authSlice';



export const Navigation: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    // We retrieve the authentication status and user profile from the Redux store
    const { isAuthenticated, userProfile } = useSelector((state: RootState) => state.auth);
    const [userName, setUserName] = useState('');

    // We handle the logout action by dispatching the logout function
    const handleLogout = () => {
        dispatch(logout());
    };

    // Effect to update the userName when the user profile is updated
    useEffect(() => {
        if (isAuthenticated) {
            setUserName(userProfile?.userName || '');
        }
    }, [isAuthenticated, userProfile?.userName]);

    
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {isAuthenticated ? (
                    <>
                        {/* We display the profile link and logout option if the user is authenticated */}
                        <Link className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i>
                            {userName}
                        </Link>
                        <Link className="main-nav-item" to="/" onClick={handleLogout}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </Link>
                    </>
                ) : (
                    // We display the sign-in option if the user is not authenticated
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
};









