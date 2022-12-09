import { styles, typography } from "../AppStyle";
import { Text, View,  Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import AppButton from "../components/AppButton/AppButton";
import React, {useEffect, useState, useContext } from "react";
import { GameContext } from "../App";
import { doc, getDoc, deleteDoc , setDoc , onSnapshot} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Toast from "react-native-root-toast";
import clearGameContext from "../hooks/ClearGameContext";
import { setStatusBarBackgroundColor } from "expo-status-bar";

const MIN_AMOUNT_OF_PLAYER = 3;
export const HostLobbyScreen = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [activeModalContent, setActiveModal] = useState(undefined);
    const { player, otherPlayers, setOtherPlayers, setPlayer } = useContext(GameContext);
    
    const closeRoom = async () => {
        setOtherPlayers([]);
        setPlayer(undefined);
        
        await deleteDoc(doc(db,"rooms", route.params.roomId));
    }

    useEffect(() => onSnapshot(doc(db, "rooms", route.params.roomId), (docSnap) => {
        if(!docSnap.exists()){
            Toast.show('No room found 😔', {
                duration: 5000,
            });
            return;
        }

        const room = docSnap.data();
        console.log(room)
        
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
                <Text style={typography.header}>{player.name}</Text>
                {otherPlayers.map((otherPlayer, key) => (
                    <Text key={key} style={typography.header2}>{otherPlayer.name}</Text>
                ))}
            </View>
        );
        setModalVisible(true);
    }

    const handleStartGame = async () => {
        if (otherPlayers.length + 1 < MIN_AMOUNT_OF_PLAYER) {
            Toast.show(`You need ${MIN_AMOUNT_OF_PLAYER - otherPlayers.length - 1} other players to start a game 😔`, {
                duration: 5000,
            });
            return;
        }

        const docRef = doc(db, "rooms", route.params.roomId);
        await setDoc(docRef, {game: "OOTL"}, {merge: true})
        navigation.navigate('OutOfTheLoop',   {roomId: route.params.roomId});
    }

    return(
        <View style={styles.container}>
            <Text style={typography.header2}>Room number</Text>
            <Text style={typography.header}>{route.params.roomId}</Text>
            <AppButton title={"Start"} onPress={handleStartGame} />
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