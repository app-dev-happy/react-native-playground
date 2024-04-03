/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Demo_ListOperations, { Demo_DisplayListScreen } from './POC_Samples/ListOperations';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NomineeList">
        <Stack.Screen name="NomineeList" component={Demo_ListOperations} options={{ title: 'Home'}}/>
        <Stack.Screen name="DisplayList" component={Demo_DisplayListScreen} options={{ title: 'Display Screen'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
