import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Firebase from '../../config/firebase';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const auth = getAuth();

export default function RootNavigator() {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // onAuthStateChanged returns an unsubscriber
      const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(user)
          setIsLoading(false)
          // ...
        } else {
          // User is signed out
          // ...
          setUser(null)
          setIsLoading(false)
        }
      });
  
      // unsubscribe auth listener on unmount
      return unsubscribeAuth;
    }, []);
  
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
  
    return (
      <NavigationContainer>
        {user ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }