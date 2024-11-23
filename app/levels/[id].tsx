import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { useEffect } from 'react';

export default function LevelScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    StatusBar.setBackgroundColor(Colors.light.background);
    StatusBar.setBarStyle('light-content');
    
    return () => {
      StatusBar.setBackgroundColor(Colors.light.background);
      StatusBar.setBarStyle('light-content');
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar 
        backgroundColor={Colors.light.background}
        barStyle="light-content"
        translucent={false}
      />
      <Text style={styles.title}>Уровень {id?.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.color,
    marginBottom: 20,
  },
});
