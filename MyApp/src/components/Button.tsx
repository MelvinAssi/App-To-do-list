import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  onPress: () => void;
  text: string;
  disabled?: boolean; 
  loading?:boolean;
};

const Button = ({ onPress, disabled = false, text,loading }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.buttonDisabled]}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#EEEEEE" />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  
  button:{
    backgroundColor: '#00ADB5',
    borderWidth:2,
    borderBlockColor:'#222831',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  buttonDisabled: {
    backgroundColor: '#393E46',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#EEEEEE',
  },
});

export default Button;
