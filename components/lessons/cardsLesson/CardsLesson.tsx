import Colors from "@/constants/Colors";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";
import ExerciseNavihationBtn from "@/components/ExerciseNavihationBtn/ExerciseNavihationBtn";
import { Card } from "@/data";
import SoundButton from "@/components/SoundButton/SoundButton";

interface Props {
  handleNext: () => void;
  data: Card[];
}

const CardsLesson: React.FC<Props> = (props: Props) => {
  const { handleNext, data } = props;
  const [flipped, setFlipped] = useState(false);
  const rotation = useSharedValue(0);

  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    setCurrentCard(currentCard + 1);
  };

  const prevCard = () => {
    setCurrentCard(currentCard - 1);
  };

  const flipCard = () => {
    if (flipped) {
      rotation.value = withTiming(0, { duration: 500 });
    } else {
      rotation.value = withTiming(180, { duration: 500 });
    }
    setFlipped(!flipped);
  };

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value}deg` }],
    opacity: rotation.value < 90 ? 1 : 0,
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value - 180}deg` }],
    opacity: rotation.value >= 90 ? 1 : 0,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Click the card to see the translation</Text>
      <TouchableWithoutFeedback onPress={flipCard}>
        <View style={styles.cardsContainer}>
          {/* Front Side */}
          <Animated.View style={[styles.card, frontAnimatedStyle]}>
            <Image
              source={{ uri: data[currentCard].image_url }}
              style={styles.image}
              onError={(error) => console.error("Error loading image:", error)}
            />
            <Text style={styles.word}>{data[currentCard].et}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.starButton}
                onPress={(e) => {
                  e.preventDefault();
                  // логика для звездочки
                }}
              >
                <FontAwesome name="star-o" size={38} style={styles.starIcon} />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Back Side */}
          <Animated.View
            style={[styles.card, styles.backCard, backAnimatedStyle]}
          >
            <Text style={styles.word}>{data[currentCard].en}</Text>
            <View style={styles.divider}></View>
            <Text style={styles.description}>
              {data[currentCard].description}
            </Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.bottomContainer}>
        <SoundButton audioUrl={data[currentCard].audio_url} />
        {currentCard === data.length - 1 ? (
          <>
            {currentCard > 0 && <ExerciseNavihationBtn onPress={prevCard} text="Prev" />}
            <ExerciseNavihationBtn onPress={handleNext} text="Finish" />
          </>
        ) : (
          <>
            {currentCard > 0 && <ExerciseNavihationBtn onPress={prevCard} text="Prev" />}
            <ExerciseNavihationBtn onPress={nextCard} text="Next" />
          </>
        )}
      </View>
    </View>
  );
};

export default CardsLesson;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 20,
    opacity: 0.8,
  },
  cardsContainer: {
    width: "90%",
    height: "78%",
    alignSelf: "center",
    perspective: "1000px",
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.light.cardsBackground,
    backfaceVisibility: "hidden",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "gray",
    padding: 20,
  },
  backCard: {
    backgroundColor: Colors.light.cardsBackground,
    transform: [{ rotateY: "180deg" }],
    justifyContent: "center",
  },
  image: {
    width: 220,
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 10,
  },
  word: {
    fontSize: 34,
    color: Colors.light.text,
    fontWeight: "bold",
    marginBottom: 10,
  },
  divider: {
    width: "60%",
    height: 2,
    backgroundColor: Colors.light.itemsColor,
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 10,
    color: Colors.light.itemsColor,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  starIcon: {
    color: Colors.light.gold,
  },
  starButton: {
    padding: 10,
    borderRadius: 10,
  },
  nextButton: {
    alignSelf: "flex-end",
    padding: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: Colors.light.itemsColor,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nextText: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "600",
  },
  bottomContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
