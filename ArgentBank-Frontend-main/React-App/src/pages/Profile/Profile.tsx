import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation } from '../../components/Navigation/Navigation';
import { Footer } from '../../components/Footer/Footer';
import { Account } from '../../components/Account/Account';
import { EditUserInfo } from '../../components/EditUserInfo/EditUserInfo';
import { AppDispatch, RootState } from '../../app/store';
import { fetchUserProfile, startProfileEdit } from '../../app/feature/authSlice';
// import { fetchUserAccounts } from '../../app/feature/accountsSlice';


export const Profile: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    // We retrieve the user profile and profile edit state from the Redux store
    const { isEditingProfile, userProfile } = useSelector((state: RootState) => state.auth);
    // We retrieve the account information (if available) and account state changes
    // const { userAccounts, loading, error } = useSelector((state: RootState) => state.accounts); 

    // We set local state for displaying user information
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');

    // We handle the click event to start editing the profile
    const handleEditClick = () => {
        dispatch(startProfileEdit());
    };

    // Effect to fetch user profile when the component mounts
    useEffect(() => {
        // We dispatch fetchUserProfile to load the profile on startup
        dispatch(fetchUserProfile());
        // dispatch(fetchUserAccounts()); // Uncomment to fetch user account information for <Account />
    }, [dispatch]);

    
    // Effect to update local fields when the userProfile changes
    useEffect(() => {
        if (userProfile) {
        setUserName(userProfile.userName || '');
        setFirstName(userProfile.firstName || '');
        }
    }, [userProfile]);

    // Uncomment these lines to handle loading and error messages for accounts
    // if (loading) return <p>Loading accounts...</p>;
    // if (error) return <p>Error loading accounts: {error}</p>;

  
    return (
        <>
            <Navigation />
            <main className="main bg-dark">
                {isEditingProfile ? (
                    // We display the edit form when the user clicks "Edit Name"
                    <EditUserInfo />
                ) : (
                     // We display the default user information when not in edit mode
                    <div className="header">
                        <h1>Welcome back<br /> {`${firstName} ${userName} !`}</h1>
                        <button className="edit-button" onClick={handleEditClick}>
                            Edit Name
                        </button>
                    </div>
                )}
                {/* We map over userAccounts (if available) to display individual account information */}
                {/* {userAccounts.map((account, index) => (
                    <Account 
                        key={index}
                        title={account.title} 
                        amount={account.amount} 
                        description={account.description} 
                    />
                ))} */}
                <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
                <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
                <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
            </main>
            <Footer />
        </>
    );
};