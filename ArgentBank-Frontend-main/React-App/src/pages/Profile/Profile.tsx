import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation } from '../../components/Navigation/Navigation';
import { Footer } from '../../components/Footer/Footer';
import { Account } from '../../components/Account/Account';
import { EditUserInfo } from '../../components/EditUserInfo/EditUserInfo';
import { AppDispatch, RootState } from '../../app/store';
import { fetchUserProfile, startProfileEdit } from '../../app/feature/authSlice';


export const Profile: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    // On recupère le profil utilisateur chargé , l'état de l'édition du profil
    const {isEditingProfile, userProfile  } = useSelector((state: RootState) => state.auth);
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const handleEditClick = () => {
        dispatch(startProfileEdit());
    };
    // Effet pour récupérer le profil utilisateur au montage du composant
    useEffect(() => {
        // Dispatch fetchUserProfile pour charger le profil au démarrage
        dispatch(fetchUserProfile());
    }, [dispatch]);
// Effet pour mettre à jour les champs locaux lorsque le userProfile est mis à jour
useEffect(() => {
    if (userProfile) {
      setUserName(userProfile.userName || '');
      setFirstName(userProfile.firstName || '');
    }
  }, [userProfile]);

  
    return (
        <>
            <Navigation />
            <main className="main bg-dark">
                {isEditingProfile ? (
                    // Affiche le formulaire d'édition lorsque l'utilisateur clique sur "Edit Name"
                    <EditUserInfo />
                ) : (
                    // Afficher les informations par défaut lorsqu'on n'est pas en mode édition
                    <div className="header">
                        <h1>Welcome back<br /> {`${firstName} ${userName} !`}</h1>
                        <button className="edit-button" onClick={handleEditClick}>
                            Edit Name
                        </button>
                    </div>
                )}
                <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
                <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
                <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
            </main>
            <Footer />
        </>
    );
};