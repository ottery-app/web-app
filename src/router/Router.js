import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './stacks/Auth.stack';
import { AppTabs } from './stacks/App.tabs';

export default function Router() {
  return (
      <NavigationContainer>
        {(true) //is authenticated
          ? <AuthStack/>
          : <AppTabs/>
        }
      </NavigationContainer>
   )
}
