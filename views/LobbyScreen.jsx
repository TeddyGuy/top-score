import { styles, typography } from "../AppStyle";
import { Text, View,  Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import AppButton from "../components/AppButton/AppButton";
import React, {useEffect, useState, useContext } from "react";
import { GameContext } from "../App";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";


export const LobbyScreen = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [activeModalContent, setActiveModal] = useState(undefined);
    const { player, otherPlayers, setOtherPlayers } = useContext(GameContext);
    let room = {players:[]};

    const unsub = onSnapshot(doc(db, "rooms", route.params.roomId), (doc) => {
        console.log("Current data: ", doc.data());
        room = doc.data();
    });

    useEffect(() => {
        setOtherPlayers(room.players.filter((otherPlayer) => player != otherPlayer ));
    },[room])


    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            setActiveModal(
                <View>
                    <Text style={typography.header2}>Close the room?</Text>
                    <AppButton title={"Yes"} onPress={() => navigation.dispatch(e.data.action)} />
                    <AppButton title={"No"} onPress={() => { setModalVisible(false) }}/>
                </View>
            )
            setModalVisible(true);
        })
    },[navigation])
    return(
        <View style={styles.container}>
            <Text style={typography.header2}>Room number</Text>
            <Text style={typography.header}>{route.params.roomId}</Text>
            <AppButton title={"Start"}/>
            <AppButton title={`Number of Players: ${otherPlayers.length}`}/>

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

export default LobbyScreen;