import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-root-toast";
import { GameContext } from "../App";
import { styles, typography } from "../AppStyle";
import { db } from "../firebaseConfig";
import { doc, getDoc, deleteDoc, setDoc, onSnapshot } from "firebase/firestore";

export const OutOfTheLoopGameScreen = ({ navigation, route }) => {

    const { player, otherPlayers, setOtherPlayers, setPlayer } = useContext(GameContext);
    const [host, setHost] = useState("");
    const [countDown, setCountDown] = useState(0);

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

        setHost(room.host)
    }), []);

    useEffect(() => onSnapshot(doc(db, "rooms", route.params.roomId), async (docSnap) => {
        if(!docSnap.exists()){
            return;
        }

        const room = docSnap.data();

        const playerWithNameFound = room.players.find(remotePlayer => player.name === remotePlayer.name);

        if(!playerWithNameFound){
            Toast.show('You were kicked out somehow 😔', {
                duration: 5000,
            });
            navigation.navigate("Home");
        }

        if(playerWithNameFound.state === "Ready") {
            return;
        }

        if(playerWithNameFound.state !== "CountingDown"){
            const docRef = doc(db, "rooms", route.params.roomId);
            await setDoc(docRef, {players: [...otherPlayers, {...player, state: "CountingDown"}]}, {merge: true});
            setCountDown(5);
            return;
        }

    }), [countDown]);

    useEffect(() => {
        const updateDoc = async () => {
            console.log("hes ready " + countDown)
            const docRef = doc(db, "rooms", route.params.roomId);
            await setDoc(docRef, {players: [...otherPlayers, {...player, state: "Ready"}]}, {merge: true})
        }

        if(countDown !== 0)  return;

        updateDoc()

    },[countDown])

    useEffect(() => {
        if(countDown === 0) {
            return;
        }

        const timeout = setTimeout(() => setCountDown((prevCount) => {
            return prevCount -1
        }), 1000);

        return () => clearTimeout(timeout);
    },[countDown])





    return (
    <View style={styles.container}>
        {countDown !== 0 && <Text style={typography.header}>GAME STARTING IN</Text>} 
        {countDown !== 0 && <Text style={typography.header2}>{countDown}</Text>}
        {countDown === 0 && <Text style={typography.header}>LETS GO</Text>}
    </View>
    );
}

export default OutOfTheLoopGameScreen;