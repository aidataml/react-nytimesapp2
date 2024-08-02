// Imports dependencies so they can be used by this component.
import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import ProfileContext from './ProfileContext';

// Component for handling profile picture URLs.
const ProfileHandler = ({ children }) => {
  // Handles profile picture link and initially sets the user state to null.
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [user, setUser] = useState(null);

  // Handles state changes for user authentication and profile pictures.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // If a user is logged in, sets the user state.
      if (user) {
        setUser(user);

        // References the user's profile document in firebase
        const profileDocument = doc(firestore, 'profiles', user.uid);
        
        // Gets the user's profile document from firebase
        const currentProfileDocument = await getDoc(profileDocument);

        // If a current profile document exists, sets the profile picture state.
        if (currentProfileDocument.exists()) {
          const profileData = currentProfileDocument.data();
          setProfilePicUrl(profileData.profilePicUrl);
        }
      } else {
        // Otherwise, sets the user state to null and profile picture state to blank.
        setUser(null);
        setProfilePicUrl('');
      }
    });
    return () => unsubscribe();
  }, []);

  // Returns profile picture and user data.
  return (
    <ProfileContext.Provider value={{ profilePicUrl, setProfilePicUrl, user }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Exports component so it can be used throughout the app.
export default ProfileHandler;
