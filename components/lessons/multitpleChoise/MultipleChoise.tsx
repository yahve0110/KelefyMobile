import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useState, useRef, useEffect } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { MultipleChoiceQuestion } from "@/data";
import Colors from "@/constants/Colors";
import SoundButton from "@/components/SoundButton/SoundButton";

interface Props {
  handleNext: () => void;
  data: MultipleChoiceQuestion[];
}

export default function MultipleChoise(props: Props) {
  const { handleNext, data } = props;
  const [currentWord, setCurrentWord] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 300 });
  }, [currentWord]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);

    const delay = answer === data[currentWord].correctWord ? 1000 : 2000;

    setTimeout(() => {
      if (currentWord === data.length - 1) {
        console.log("handleNext");
        handleNext();
      } else {
        setSelectedAnswer(null);
        setCurrentWord(currentWord + 1);
      }
    }, delay);
  };

  const getVariantStyle = (translation: string) => {
    if (!selectedAnswer) return styles.variant;

    if (translation === data[currentWord].correctWord) {
      return [styles.variant, styles.correctAnswer];
    }

    if (
      selectedAnswer !== data[currentWord].correctWord &&
      translation !== data[currentWord].correctWord
    ) {
      return [styles.variant, styles.wrongAnswer];
    }

    return styles.variant;
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.soundButtonContainer}>
        <SoundButton audioUrl={data[currentWord].audio_url} />
      </View>
      
      <View style={styles.wordContainer}>
        <Text style={styles.word}>{data[currentWord].word}</Text>
      </View>

      <Image
        source={{ uri: data[currentWord].image_url }}
        style={styles.image}
      />

      <View style={styles.variantsContainer}>
        {data[currentWord].translations.map((translation) => (
          <Pressable
            key={translation}
            style={({ pressed }) => [
              getVariantStyle(translation),
              pressed && !selectedAnswer && styles.variantPressed,
            ]}
            onPress={() => !selectedAnswer && handleAnswer(translation)}
            disabled={!!selectedAnswer}
          >
            <Text
              style={[
                styles.variantText,
                selectedAnswer &&
                  translation === data[currentWord].correctWord &&
                  styles.correctText,
              ]}
            >
              {translation}
            </Text>
          </Pressable>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 15,
   
  },
  soundButtonContainer: {
    position: 'absolute',
    left: 15,
    bottom: 5,
    zIndex: 1,
  },
  wordContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  word: {
    fontSize: 34,
    fontWeight: "bold",
    color: Colors.light.text,
    textAlign: "center",
  },
  image: {
    width: 220,
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 10,
    alignSelf: "center",
  },
  variantsContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  variant: {
    backgroundColor: Colors.light.itemsColor,
    width: "90%",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  variantPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  correctAnswer: {
    backgroundColor: Colors.light.green,
  },
  wrongAnswer: {
    backgroundColor: Colors.light.red,
  },
  variantText: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.light.text,
  },
  correctText: {
    color: "#fff",
  },
});
