import * as React from 'react';
import paths from '../paths';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from './Home.stack';
import { DropoffStack } from './DropOff.stack';
import { PickUpStack } from './PickUp.stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === paths.main.name) {
                    iconName = (focused) ? 'home' : 'home-outline';
                  } else if (route.name === paths.dropoff.name) {
                    iconName = "chevron-down";
                  } else if (route.name === paths.pickup.name) {
                    iconName = 'chevron-up';
                  }
      
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                // tabBarActiveTintColor: 'tomato',
                // tabBarInactiveTintColor: 'gray',
                headerShown: false
              })}
            initialRouteName={paths.main.name}
        >
            <Tab.Screen name={paths.dropoff.name} component={DropoffStack}/>
            <Tab.Screen name={paths.main.name} component={HomeStack}/>
            <Tab.Screen name={paths.pickup.name} component={PickUpStack}/>
        </Tab.Navigator>
    );
}