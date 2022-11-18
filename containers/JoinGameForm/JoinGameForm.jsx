import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-root-toast";
import AppButton from "../../components/AppButton/AppButton";
import AppInput from "../../components/AppInput/AppInput";
import { db } from "../../firebaseConfig";

const JoinGameForm = () => {
    const [formData, setFormData] = useState({
        name:"",
        room:""
    });

    const handleJoinGame = async () => {
        const docRef = doc(db, "rooms", formData.room);
        const docSnap = await getDoc(docRef);

        if(!docSnap.exists()){
            Toast.show('No room found 😔', {
                duration: Toast.durations.LONG,
            });
            return;
        }

        const room = docSnap.data();

        await setDoc(docRef, { players:[...room.players,formData.name] }, {merge: true});

        Toast.show('Joined room, waiting for more players 👾', {
            duration: Toast.durations.LONG,
        });
    }
    return (
        <View>
            <AppInput 
            placeholder={"YOUR NAME"} 
            value={formData.name} 
            onChangeText={text => setFormData({...formData, name:text.toUpperCase()})}
            />
            <AppInput 
            placeholder={"ROOM NUMBER"} 
            value={formData.room} 
            onChangeText={text => setFormData({...formData, room:text.toUpperCase()})}
            />
            <AppButton title={"Confirm"} onPress={handleJoinGame}/>
        </View>
    );
}

export default JoinGameForm;