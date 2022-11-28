import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-root-toast";
import AppButton from "../../components/AppButton/AppButton";
import AppInput from "../../components/AppInput/AppInput";
import { db } from "../../firebaseConfig";

export const CreateGameForm = ({handleCreateGame}) => {
    const [formData, setFormData] = useState({
        name:"",
        roomSize:0
    });

    const MINIMUM_ROOM_SIZE = 3;
    
    return (
        <View>
            <AppInput 
                placeholder={"YOUR NAME"} 
                value={formData.name} 
                onChangeText={text => setFormData({...formData, name:text.toUpperCase()})}
            />
            <AppInput 
                placeholder={"ROOM SIZE"} 
                value={formData.roomSize} 
                onChangeText={text => {
                    const size = parseInt(text.replace(/[^3-9]/g, ''));
                    
                    if (isNaN(size)) {
                        setFormData({
                            ...formData,
                            roomSize: MINIMUM_ROOM_SIZE
                            }
                        )
                    } else {
                        setFormData({
                            ...formData,
                            roomSize: size
                        })
                    }
                }}
                keyboardType={"phone-pad"}
                maxLength={1}
            />
            <AppButton title={"Confirm"} onPress={() => handleCreateGame(formData)}/>
        </View>
    );
}

export default CreateGameForm;