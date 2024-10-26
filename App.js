import React from 'react';
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import HomeStack from './routes/HomeStack';

import { Provider } from 'react-redux'
import store from './redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStack/>
      </NavigationContainer>
    </Provider>
  );
}