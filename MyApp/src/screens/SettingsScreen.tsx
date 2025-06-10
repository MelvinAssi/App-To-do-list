import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { useAuthContext } from '../hooks/useAuthContext';
import { RootParamList } from '../navigations/AppNavigator';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type NavigationProp = StackNavigationProp<RootParamList>;
const SettingsScreen: React.FC = () => {
  const { user, signOut } = useAuthContext();
  const navigation = useNavigation<NavigationProp>();

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
      <Button title="Se déconnecter" onPress={handleLogout} />
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
  }
});

export default SettingsScreen;
