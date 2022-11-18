import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-root-toast";
import AppButton from "../../components/AppButton/AppButton";
import AppInput from "../../components/AppInput/AppInput";
import { db } from "../../firebaseConfig";

export const CreateGameForm = () => {
    const [formData, setFormData] = useState({
        name:""
    });
    const handleCreateGame = async () => {
        try {
            let roomId = Math.random().toString(36).substr(2, 10).toUpperCase();
            await setDoc(doc(db, "rooms", roomId), {
              players:[formData.name]
            });
            Toast.show('Hi there 👋. Your roomId is: ' + roomId, {
              duration: Toast.durations.LONG,
            });
        } catch (e) {
            console.log(e);
            Toast.show('Failed to create a room', {
                duration: Toast.durations.LONG,
            });
        }
        setFormData({
            name:""
        })
    }
    return (
        <View>
            <AppInput 
                placeholder={"YOUR NAME"} 
                value={formData.name} 
                onChangeText={text => setFormData({...formData, name:text.toUpperCase()})}
            />
            <AppButton title={"Confirm"} onPress={handleCreateGame}/>
        </View>
    );
}

export default CreateGameForm;