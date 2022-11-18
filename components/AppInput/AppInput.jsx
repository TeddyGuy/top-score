import { TextInput } from "react-native"
import { styles } from "../../AppStyle"

export const AppInput = ({ref, placeholder, onChangeText, value}) => {
    return <TextInput 
    style={styles.input} 
    ref={ref} 
    onChangeText={onChangeText}
    value={value}
    placeholder={placeholder} 
    placeholderTextColor={"#f2f3ae"} 
    cursorColor={"#69140E"}
    autoCapitalize="none"
    secureTextEntry={true}
    keyboardType={"visible-password"}
    maxLength={12}
    />
}

export default AppInput;