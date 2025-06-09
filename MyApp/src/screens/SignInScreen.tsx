import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { RootTabParamList } from '../navigations/AppNavigator';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

type SignInTaskRouteProp = RouteProp<RootTabParamList, 'SignIn'>;
type NavigationProp = StackNavigationProp<RootTabParamList>;
type Props = {
  route: SignInTaskRouteProp;
};

const SignInScreen: React.FC<Props> = () => {
    const navigation = useNavigation<NavigationProp>();
    const {user,signIn} = useAuthContext();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSignin = async()=>{
      if (!email || !password) {
          console.log('Email or password is empty:', { email, password });
          return;
        }
        try{
          await signIn(email, password)
          navigation.replace('Main');
        }catch (error){
          console.error('Sign-in error:', error);
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
            <TouchableOpacity  onPress={handleSignin} style={undefined} >
                <Text style={{fontWeight:'bold',fontSize:24,color:'black'}}>SignIn</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={()=>(navigation.navigate('SignUp'))} style={undefined} >
                <Text style={{fontWeight:'bold',fontSize:24,color:'black'}}>Pas encore de compte</Text>
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

export default SignInScreen;