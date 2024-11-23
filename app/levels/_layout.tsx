import { Stack } from 'expo-router';
import { StatusBar, Text } from 'react-native';
import Colors from '@/constants/Colors';

export default function LevelLayout() {
  return (
    <>
      <StatusBar 
        backgroundColor={Colors.light.secondaryBackground}
        barStyle="light-content"
        translucent={false}
      />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.light.secondaryBackground,
          },
          headerTintColor: Colors.light.color,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          statusBarColor: Colors.light.secondaryBackground,
          statusBarStyle: 'light-content',
          statusBarTranslucent: false,
        }}
      >
        <Stack.Screen 
          name="[id]"
          options={{
            headerTitle: "Level",
            headerStyle: {
              backgroundColor: Colors.light.background,
            },
            headerTitleStyle: {
              color: Colors.light.color,
              fontSize: 20,
              fontWeight: 'bold',
            },
          }}
        />
      </Stack>
    </>
  );
} 