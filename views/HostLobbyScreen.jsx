import { styles, typography } from "../AppStyle";
import { Text, View,  Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import AppButton from "../components/AppButton/AppButton";
import React, {useEffect, useState, useContext } from "react";
import { GameContext } from "../App";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Toast from "react-native-root-toast";
import clearGameContext from "../hooks/ClearGameContext";


export const HostLobbyScreen = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [activeModalContent, setActiveModal] = useState(undefined);
    const { player, otherPlayers, setOtherPlayers, setPlayer } = useContext(GameContext);
    
    const closeRoom = async () => {
        setOtherPlayers([]);
        setPlayer(undefined);
        
        await deleteDoc(doc(db,"rooms", route.params.roomId));
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            const docRef = doc(db, "rooms", route.params.roomId);
            const docSnap = await getDoc(docRef);

            if(!docSnap.exists()){
                Toast.show('No room found 😔', {
                    duration: 5000,
                });
                return;
            }

            const room = docSnap.data();
            
            if(player) {
                setOtherPlayers(room.players.filter((otherPlayer) => player != otherPlayer ));
            }

        }, 1500);
      
        return () => clearInterval(interval);
    });

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            setActiveModal(
                <View>
                    <Text style={typography.header2}>Close the room?</Text>
                    <AppButton title={"Yes"} onPress={async () => {
                                await closeRoom();
                                navigation.dispatch(e.data.action);
                                Toast.show('Room Closed 👋', {
                                    duration: 5000,
                                });
                            }
                        }
                    />
                    <AppButton title={"No"} onPress={() => { setModalVisible(false) }}/>
                </View>
            )
            setModalVisible(true);
        })
    },[navigation])

    const handleShowPlayers = async () => {
        setActiveModal(
            <View>
                <Text style={typography.header}>{player}</Text>
                {otherPlayers.map((otherPlayer, key) => (
                    <Text key={key} style={typography.header2}>{otherPlayer}</Text>
                ))}
            </View>
        );
        setModalVisible(true);
    }

    return(
        <View style={styles.container}>
            <Text style={typography.header2}>Room number</Text>
            <Text style={typography.header}>{route.params.roomId}</Text>
            <AppButton title={"Start"}/>
            <AppButton title={`Number of Players: ${otherPlayers.length}`} onPress={handleShowPlayers}/>

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
    );
}

export default HostLobbyScreen;