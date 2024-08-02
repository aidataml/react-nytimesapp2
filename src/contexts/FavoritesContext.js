// src/contexts/FavoritesContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import ProfileContext from './ProfileContext';

// Create context object for changing favorite state.
const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

// Component for handling favorites.
export const FavoritesHandler = ({ children }) => {
  const { user } = useContext(ProfileContext);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const favoritesCollectionRef = collection(firestore, `profiles/${user.uid}/favorites`);
      const unsubscribe = onSnapshot(favoritesCollectionRef, (snapshot) => {
        const userFavorites = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFavorites(userFavorites);
      });
      return () => unsubscribe();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const toggleFavorite = async (article) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const encodedUrl = encodeURIComponent(article.url);
    const articleDocRef = doc(firestore, `profiles/${user.uid}/favorites`, encodedUrl);
    const docSnapshot = await getDoc(articleDocRef);

    if (docSnapshot.exists()) {
      await deleteDoc(articleDocRef);
    } else {
      await setDoc(articleDocRef, article);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;