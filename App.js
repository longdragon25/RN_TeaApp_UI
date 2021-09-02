import { Location, Order, OrderDetail } from "./screens";
import { applyMiddleware, createStore } from "redux";

import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import React from "react";
import SplashScreen from "react-native-splash-screen";
import Tabs from "./navigation/tabs";
import { createStackNavigator } from "@react-navigation/stack";
import themeReducer from "./stores/themeReducer";
import thunk from "redux-thunk";

const store = createStore(themeReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();
LogBox.ignoreAllLogs(true);
const App = () => {
  //   React.useEffect(() => {
  //     SplashScreen.hide();
  //   }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Home"}
        >
          <Stack.Screen name="Home" component={Tabs} />

          <Stack.Screen name="Location" component={Location} />

          <Stack.Screen name="Order" component={Order} />

          <Stack.Screen name="OrderDetail" component={OrderDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
