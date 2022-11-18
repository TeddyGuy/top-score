import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-root-toast";
import AppButton from "../../components/AppButton/AppButton";
import AppInput from "../../components/AppInput/AppInput";
import { db } from "../../firebaseConfig";

export const CreateGameForm = ({handleCreateGame}) => {
    const [formData, setFormData] = useState({
        name:""
    });
    
    return (
        <View>
            <AppInput 
                placeholder={"YOUR NAME"} 
                value={formData.name} 
                onChangeText={text => setFormData({...formData, name:text.toUpperCase()})}
            />
            <AppButton title={"Confirm"} onPress={() => handleCreateGame(formData)}/>
        </View>
    );
}

export default CreateGameForm;