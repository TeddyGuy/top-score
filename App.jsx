import { Text, View,  Modal, TouchableOpacity, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { styles, typography } from './AppStyle';
import AppButton from './components/AppButton/AppButton';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebaseConfig';
import * as Device from 'expo-device';
import React, { useState } from "react";
import JoinGameForm from './containers/JoinGameForm/JoinGameForm';
import CreateGameForm from './containers/CreateGameForm/CreateGameForm';

export const App = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [activeModalContent, setActiveModal] = useState(undefined);

  const handlePingMe = async () => {
    try {
      const docRef = await addDoc(collection(db, "pings"), {
        message: `Hi from a ${Device.modelName}`,
      });
      Toast.show('Hi there 👋. Your ping id is: ' + docRef.id, {
        duration: Toast.durations.LONG,
      });
    } catch (e) {
      Toast.show('No response from server :(', {
        duration: Toast.durations.LONG,
      });
    }
  }
  
  const handleShowCreateGameForm = async () => {
    setModalVisible(true);
    setActiveModal(<CreateGameForm/>);
  }

  const handleShowJoinGameForm = async () => {
    setModalVisible(true);
    setActiveModal(<JoinGameForm/>);
  }

  return (
    <RootSiblingParent>
      
      <View style={styles.container}>
        <StatusBar translucent/>
        <Text style={typography.header} >Top Score</Text>
        <View>
          <AppButton title="Join Game" onPress={handleShowJoinGameForm}/>
          <AppButton title="Create Game" onPress={handleShowCreateGameForm}/>
          <AppButton title="Ping Me 👋" onPress={handlePingMe}/>
        </View>
        
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
              <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPressOut={() => {setModalVisible(false)}}>
                
                  <TouchableWithoutFeedback>
                    
                    <View style={styles.modalView}>
                      { activeModalContent }
                    </View>
                    
                  </TouchableWithoutFeedback>
                
              </TouchableOpacity>
          </Modal>
      </View>
    </RootSiblingParent>    
  );
}

export default App;


