import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { RootParamList } from '../navigations/AppNavigator';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { AuthStackParamList } from '../navigations/AuthNavigator';

type SignUpTaskRouteProp = RouteProp<AuthStackParamList, 'SignUp'>;
type NavigationProp = StackNavigationProp<AuthStackParamList>;
type Props = {
  route: SignUpTaskRouteProp;
};

const SignUpScreen: React.FC<Props> = () => {
    const navigation = useNavigation<NavigationProp>();
    const {user,signUp} = useAuthContext();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSignUp = async()=>{
        if (!email || !password) {
          console.log('Email or password is empty:', { email, password });
          return;
        }
        try{
          await signUp(email, password)
          //navigation.replace('Main', { screen: 'Home' });
        }catch (error){
          console.error('Sign-up error:', error);
        }  
        
    }
    return(
        <SafeAreaView style={styles.page}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={undefined}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={undefined}
                secureTextEntry
            />
            <TouchableOpacity  onPress={handleSignUp} style={undefined} >
                <Text style={{fontWeight:'bold',fontSize:24,color:'black'}}>SignUp</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>(navigation.navigate('SignIn'))} style={undefined} >
                <Text style={{fontWeight:'bold',fontSize:24,color:'black'}}>Déja un compte</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
  page:{
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    flex:1,
    display:'flex',
  },

});

export default SignUpScreen;