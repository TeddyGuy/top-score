
import { RootSiblingParent } from 'react-native-root-siblings';
import React, {createContext, useState} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './views/HomeScreen';
import LobbyScreen from './views/LobbyScreen';

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
              name="Lobby"
              component={LobbyScreen}
              options={{ statusBarHidden: true, headerShown: false,  }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent> 
    </GameContext.Provider>
  );
}

export default App;


