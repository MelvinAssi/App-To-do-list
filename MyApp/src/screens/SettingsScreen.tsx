import React from 'react';
import {  Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAuthContext } from '../hooks/useAuthContext';
import Button from '../components/Button';

const SettingsScreen: React.FC = () => {
  const { user, signOut } = useAuthContext();

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("Déconnexion réussie");
    } catch (err) {
      console.error("Erreur de déconnexion", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.email}>{user?.email}</Text>
      <Button text='Se déconnecter' onPress={() => handleLogout()} ></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  email: {
    fontSize: 18,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#00ADB5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#EEEEEE',
  },
});

export default SettingsScreen;
