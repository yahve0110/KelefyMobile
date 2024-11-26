import { View, StyleSheet, Text } from "react-native";
import VideoLesson from "@/components/lessons/videoLesson/VideoLesson";
import Colors from "@/constants/Colors";
import { data } from "@/data";
import CardsLesson from "@/components/lessons/cardsLesson/CardsLesson";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import MultipleChoise from "@/components/lessons/multitpleChoise/MultipleChoise";
import Matching from "@/components/lessons/matching/Matching";

type LessonType = "video" | "cards" | "multipleChoice" | "matching";

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [dataNr, setDataNr] = useState(1);

  const handleNext = () => {
    setDataNr(dataNr + 1);
  };

  const LESSON_COMPONENTS: Record<LessonType, React.ReactNode> = {
    video:
      data[id][dataNr].type === "video" ? (
        <VideoLesson key={`${id}-${dataNr}`} {...data[id][dataNr]} handleNext={handleNext} />
      ) : null,
    cards:
      data[id][dataNr].type === "cards" ? (
        <CardsLesson key={`${id}-${dataNr}`} data={data[id][dataNr].data} handleNext={handleNext} />
      ) : null,
    multipleChoice:
      data[id][dataNr].type === "multipleChoice" ? (
        <MultipleChoise key={`${id}-${dataNr}`} data={data[id][dataNr].data} handleNext={handleNext} />
      ) : null,
    matching: 
      data[id][dataNr].type === "matching" ? (
        <Matching key={`${id}-${dataNr}`} data={data[id][dataNr].data} handleNext={handleNext} />
      ) : null,
  } as const;

  if (!data[id]?.[dataNr]?.type) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {LESSON_COMPONENTS[data[id][dataNr].type as LessonType]}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
