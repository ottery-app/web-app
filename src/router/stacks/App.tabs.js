import * as React from 'react';
import paths from '../paths';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from './Home.stack';
import { DropoffStack } from './DropOff.stack';
import { PickUpStack } from './PickUp.stack';

const Tab = createBottomTabNavigator();

export function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={paths.main.name}
        >
            <Tab.Screen name={paths.dropoff.name} component={DropoffStack}/>
            <Tab.Screen name={paths.main.name} component={HomeStack}/>
            <Tab.Screen name={paths.pickup.name} component={PickUpStack}/>
        </Tab.Navigator>
    );
}