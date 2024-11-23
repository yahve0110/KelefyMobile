import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, router } from 'expo-router';
import Colors from '@/constants/Colors';

const { width, height } = Dimensions.get('window');
const videoHeight = height * 0.75; // 3/4 экрана для видео

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleNext = () => {
    const nextId = String(Number(id) + 1);
    router.push({
      pathname: "/lesson/[id]",
      params: { id: nextId }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <WebView
          style={styles.video}
          source={{ 
            uri: 'https://app.heygen.com/embeds/4dd02802245f45909d092aad7d0458c7' 
          }}
          allowsFullscreenVideo
          javaScriptEnabled
          domStorageEnabled
          scalesPageToFit
        />
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>Next Lesson</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  videoContainer: {
    height: videoHeight,
  },
  video: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1, // Оставшаяся 1/4 экрана
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  nextButton: {
    backgroundColor: Colors.light.green,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 