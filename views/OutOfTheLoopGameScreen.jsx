import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-root-toast";
import { GameContext } from "../App";
import { styles, typography } from "../AppStyle";
import { db } from "../firebaseConfig";
import { doc, getDoc, deleteDoc, setDoc, onSnapshot } from "firebase/firestore";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import AppButton from "../components/AppButton/AppButton";

const WordBank = ["BANANA", "AIRPLANE", "ENGLISH", "HEADPHONES", "DOOR", "PIZZA", "OBAMA", "INSANE", "HAMBURGER", "POUTINE", "CANADA", "UKRAINE", "GAME OF THRONE", "RIZZ"];

export const OutOfTheLoopGameScreen = ({ navigation, route }) => {

    const { player, otherPlayers, setOtherPlayers, setPlayer } = useContext(GameContext);
    const [countDown, setCountDown] = useState(0);
    const [isOOTL, setIsOOTL] = useState(false);
    const [word, setWord] = useState("")
    const [turn, setTurn] = useState(false);

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
    }), []);

    useEffect(() => onSnapshot(doc(db, "rooms", route.params.roomId), (docSnap) => {
        if(!docSnap.exists()){
            return;
        }

        const room = docSnap.data();
        
        setIsOOTL(player.name === room.isOOTL); 
        setWord(room.OOTLWord);
    }), []);

    useEffect(() => onSnapshot(doc(db, "rooms", route.params.roomId), (docSnap) => {
        if(!docSnap.exists()){
            return;
        }

        const room = docSnap.data();
        
        if(!room.isOOTL || !room.OOTLWord){
            return;
        }
        
        setTurn(room.turn)
    }), []);

    useEffect(() => onSnapshot(doc(db, "rooms", route.params.roomId), async (docSnap) => {
        if(!docSnap.exists()){
            return;
        }

        const room = docSnap.data();
        
        let everyoneIsReady = true; 
        room.players.forEach(player => {
            if(player.state !== "Ready") everyoneIsReady = false;
        });

        if(!everyoneIsReady){
            return;
        }

        if(room.host !== player.name){
            return;
        }

        if(room.isOOTL && room.OOTLWord){
            return;
        }

        const docRef = doc(db, "rooms", route.params.roomId);
        const chosenPlayer = room.players[Math.floor(Math.random() * room.players.length)].name;
        await setDoc(docRef,
            {
                isOOTL: chosenPlayer,
                OOTLWord: WordBank[Math.floor(Math.random() * room.players.length)],
                turn: room.players.filter(player => player.name !== chosenPlayer)[Math.floor(Math.random() * room.players.length)].name
            },
            {merge: true});

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

        if(playerWithNameFound.state === "Ready" || playerWithNameFound.state === "Played") {
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

        if(countDown > 0)  return;
        updateDoc()

    },[countDown])

    useEffect(() => {
        if(countDown < 1) {
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
        {countDown === 0 && isOOTL && <Text style={typography.header}>YOU'RE OUT OF THE LOOP</Text>}
        {countDown === 0 && !isOOTL && <Text style={typography.header}>THE WORD IS :</Text>}
        {countDown === 0 && !isOOTL && <Text style={typography.header2}>{word}</Text>}
        {turn === player.name && <AppButton title={"END YOUR TURN"}/>}
        {countDown === 0 && turn !== player.name && <Text style={typography.header2}>It's {turn}'s turn ...</Text>}
    </View>
    );
}

export default OutOfTheLoopGameScreen;