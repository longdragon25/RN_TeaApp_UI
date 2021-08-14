import { Location, Order, OrderDetail } from "./screens";

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import SplashScreen from 'react-native-splash-screen'
import Tabs from "./navigation/tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {

    // React.useEffect(() => {
    //     SplashScreen.hide();
    // }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Home'}
            >
                <Stack.Screen
                    name="Home"
                    component={Tabs}
                />

                <Stack.Screen
                    name="Location"
                    component={Location}
                />

                <Stack.Screen
                    name="Order"
                    component={Order}
                />

                <Stack.Screen
                    name="OrderDetail"
                    component={OrderDetail}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;