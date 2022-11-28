
import { RootSiblingParent } from 'react-native-root-siblings';
import React, {createContext, useState} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './views/HomeScreen';
import HostLobbyScreen from './views/HostLobbyScreen';
import GuestLobbyScreen from './views/GuestLobbyScreen';

const Stack = createNativeStackNavigator();
export const GameContext = createContext();

export const App = () => {

  const [player, setPlayer] = useState(undefined);
  const [otherPlayers, setOtherPlayers] = useState([]);

  return (
    <GameContext.Provider value={{player, setPlayer ,otherPlayers, setOtherPlayers}}>
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ statusBarHidden: true, headerShown: false }}
            />
            <Stack.Screen
              name="HostLobby"
              component={HostLobbyScreen}
              options={{ statusBarHidden: true, headerShown: false,  }}
            />
            <Stack.Screen
              name="GuestLobby"
              component={GuestLobbyScreen}
              options={{ statusBarHidden: true, headerShown: false,  }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent> 
    </GameContext.Provider>
  );
}

export default App;


