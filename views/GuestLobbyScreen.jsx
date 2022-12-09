import { styles, typography } from "../AppStyle";
import { Text, View,  Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import AppButton from "../components/AppButton/AppButton";
import React, {useEffect, useState, useContext } from "react";
import { GameContext } from "../App";
import { doc, getDoc, deleteDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Toast from "react-native-root-toast";
import clearGameContext from "../hooks/ClearGameContext";


export const GuestLobbyScreen = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [activeModalContent, setActiveModal] = useState(undefined);
    const { player, otherPlayers, setOtherPlayers, setPlayer } = useContext(GameContext);
    
    const leaveRoom = async () => {
        const docRef = doc(db, "rooms", route.params.roomId);
        const docSnap = await getDoc(docRef);

        if(!docSnap.exists()){
            Toast.show('No room found 😔', {
                duration: 5000,
            });
            navigation.navigate("Home");
            return;
        }

        const room = docSnap.data();

        await setDoc(docRef, { players: otherPlayers}, {merge: true});

        setOtherPlayers([]);
        setPlayer(undefined);
    }

    useEffect(() => onSnapshot(doc(db, "rooms", route.params.roomId), (docSnap) => {
        if(!docSnap.exists()){
            Toast.show('No room found 😔', {
                duration: 5000,
            });
            navigation.navigate("Home");
            return;
        }

        const room = docSnap.data();
        
        if(player) {
            setOtherPlayers(room.players.filter((otherPlayer) => player.name !== otherPlayer.name ));
        }

        if(room.game === "OOTL"){
            navigation.navigate('OutOfTheLoop',   {roomId: route.params.roomId});
        }
    }), []);

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            setActiveModal(
                <View>
                    <Text style={typography.header2}>Leave the room?</Text>
                    <AppButton title={"Yes"} onPress={async () => {
                                await leaveRoom();
                                navigation.dispatch(e.data.action);
                                Toast.show('See ya 👋', {
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
                <Text style={typography.header}>{player.name}</Text>
                {otherPlayers.map((otherPlayer, key) => (
                    <Text key={key} style={typography.header2}>{otherPlayer.name}</Text>
                ))}
            </View>
        );
        setModalVisible(true);
    }

    return(
        <View style={styles.container}>
            <Text style={typography.header2}>Room number</Text>
            <Text style={typography.header}>{route.params.roomId}</Text>
            <Text style={typography.header2}>Waiting for more players ...</Text>
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

export default GuestLobbyScreen;