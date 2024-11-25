import Colors from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import WebView from "react-native-webview";

const { width, height } = Dimensions.get("window");
const videoHeight = height * 0.75;

type Props = {
  type: string;
  href: string;
  handleNext: () => void;
}

const VideoLesson = ({ type, href,handleNext }: Props) => {

  return (
    <>
      <View style={styles.videoContainer}>
          <WebView
          style={styles.video}
          source={{
            uri: href,
          }}
          allowsFullscreenVideo
          javaScriptEnabled
          domStorageEnabled
          scalesPageToFit
        />
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next Lesson</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default VideoLesson;

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
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  nextButton: {
    backgroundColor: Colors.light.green,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
