import { Text, View,  Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { styles, typography } from './AppStyle';
import AppButton from './components/AppButton/AppButton';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebaseConfig';
import * as Device from 'expo-device';
import React, { useState } from "react";

export const App = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const handlePingMe = async () => {
    try {
      const docRef = await addDoc(collection(db, "pings"), {
        message: `Hi from a ${Device.modelName}`,
      });
      Toast.show('Hi there 👋. Your ping id is: ' + docRef.id, {
        duration: Toast.durations.LONG,
      });
    } catch (e) {
      console.error('No response from the server :( ', e);
    }
  }
  
  const handleCreateGame = async () => {
    setModalVisible(true);
  }

  const handleJoinGame = async () => {
    setModalVisible(true);
  }

  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Text style={typography.header} >Top Score</Text>
        <View>
          <AppButton title="Join Game" onPress={handleJoinGame}/>
          <AppButton title="Create Game" onPress={handleCreateGame}/>
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
                      <Text style={typography.text}>Wow</Text>
                    </View>
                    
                  </TouchableWithoutFeedback>
                
              </TouchableOpacity>
          </Modal>
      </View>
    </RootSiblingParent>    
  );
}

export default App;


