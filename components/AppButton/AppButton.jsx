import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { styles, typography } from "../../AppStyle";

export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity 
        onPress={onPress} 
        style={styles.button} 
        activeOpacity={0.8}
    >
      <Text style={typography.button}>{title}</Text>
    </TouchableOpacity>
);

export default AppButton;