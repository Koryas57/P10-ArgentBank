import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { cancelProfileEdit, updateUserProfile } from '../../app/feature/authSlice';
import './EditUserInfo.scss';


export const EditUserInfo: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  // We retrieve user profile, loading, and error states from Redux store
  const { userProfile, loading, error } = useSelector((state: RootState) => state.auth);

  // We set local state for user information fields
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  // Effect to update local fields when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setUserName(userProfile.userName || '');
      setFirstName(userProfile.firstName || '');
      setLastName(userProfile.lastName || '');
    }
  }, [userProfile]);


  // We handle the save action to update the userName
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // We dispatch the action to update userName
      // unwrap() is used to directly get the result of the action (success or failure)
      await dispatch(updateUserProfile(userName)).unwrap();
      console.log('UserName updated successfully');
    } catch (error) {
      console.error('Error while updating user profile:', error);
    }
  };

  // We handle the cancel action to exit edit mode
  const handleCancel = () => {
    dispatch(cancelProfileEdit());
  };

  // We display loading and error messages if necessary
  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile: {error}</p>;


  return (
    <form className="edit-user-info" onSubmit={handleSave}>
      <h1>Edit user info</h1>
      <div className='form-element'>
        <label htmlFor="username">User name:</label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="form-element">
        <label htmlFor="firstName">First name:</label>
        <input type="text" id="firstName" value={firstName} disabled />
      </div>
      <div className='form-element'>
        <label htmlFor="lastName">Last name:</label>
        <input type="text" id="lastName" value={lastName} disabled />
      </div>
      <div className="button-container">
        <button type="submit" className="save-button">Save</button>
        <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
      </div>
    </form>
  );
};