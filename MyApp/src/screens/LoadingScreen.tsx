import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../hooks/useAuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootTabParamList } from '../navigations/AppNavigator';

type NavigationProp = StackNavigationProp<RootTabParamList>;

const LoadingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user,isLoading } = useAuthContext();

  useEffect(() => {
    if (isLoading) return;
    if (user === null) {
      navigation.replace('SignIn');
    } else {
      navigation.replace('Main');
    }
  },[user, isLoading]);

if (isLoading) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
