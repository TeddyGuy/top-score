import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-root-toast";
import AppButton from "../../components/AppButton/AppButton";
import AppInput from "../../components/AppInput/AppInput";
import { db } from "../../firebaseConfig";

const JoinGameForm = ({handleJoinGame}) => {
    const [formData, setFormData] = useState({
        name:"",
        room:""
    });

    
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
            <AppButton title={"Confirm"} onPress={() => handleJoinGame(formData)}/>
        </View>
    );
}

export default JoinGameForm;