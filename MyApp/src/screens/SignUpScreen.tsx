import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { AuthStackParamList } from '../navigations/AuthNavigator';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';

type SignUpTaskRouteProp = RouteProp<AuthStackParamList, 'SignUp'>;
type NavigationProp = StackNavigationProp<AuthStackParamList>;
type Props = {
  route: SignUpTaskRouteProp;
};

const SignUpScreen: React.FC<Props> = () => {
    const navigation = useNavigation<NavigationProp>();
    const {signUp} = useAuthContext();
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const signupSchema = object({
      email: string()
        .required('L\'email est obligatoire')
        .email('Format d\'email invalide')
        .max(64, 'Email trop long !'),
      password: string()
        .required('Le mot de passe est obligatoire')
        .min(12, '12 caractères minimum')
        .max(64, 'Mot de passe trop long !')
        .matches(/[A-Z]/, 'Doit contenir au moins une majuscule')
        .matches(/[a-z]/, 'Doit contenir au moins une minuscule')
        .matches(/\d/, 'Doit contenir au moins un chiffre')
        .matches(/[!@#$%^&*]/, 'Doit contenir au moins un caractère spécial'),
    });
    const handleSignUp = async(email:string,password:string)=>{
        setErrorMsg('');
        setLoading(true);
        try{
          await signUp(email, password)
    } catch (error: any) {
      setErrorMsg("Email déjà utilisé");
      console.error('Sign-up error:', error);
    } finally {
      setLoading(false);
    }
        
    }
      return (
    <SafeAreaView style={styles.page}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => handleSignUp(values.email, values.password)}
        validationSchema={signupSchema}
      >
        {({ errors, values, isValid, touched, handleChange, handleSubmit, isSubmitting }) => (
          <>
            <TextInput
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              placeholder="Mot de passe"
              value={values.password}
              onChangeText={handleChange('password')}
              style={styles.input}
              autoCapitalize="none"
              secureTextEntry
            />
            { errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            {errorMsg !== '' && <Text style={styles.errorText}>{errorMsg}</Text>}
            <TouchableOpacity
              onPress={() => handleSubmit()} 
              style={[styles.button, (!isValid  || isSubmitting) && styles.buttonDisabled]}
              disabled={!isValid || isSubmitting}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#EEEEEE" />
              ) : (
                <Text style={styles.buttonText}>S'inscrire</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <TouchableOpacity
        onPress={() => navigation.navigate('SignIn')} 
      >
        <Text style={styles.buttonText1}>
          Déjà un compte ? Connetez-vous
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor:'#EEEEEE'
  },
  input: {
    borderWidth: 1,
    borderColor: '#393E46',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00ADB5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#393E46',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#EEEEEE',
  },
  buttonText1: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#393E46',
  },
  signupButton: {
    padding: 15,
    alignItems: 'center',
  },
});


export default SignUpScreen;