import { View, StyleSheet, Text } from "react-native";
import VideoLesson from "@/components/lessons/videoLesson/VideoLesson";
import Colors from "@/constants/Colors";
import { data } from "@/data";
import CardsLesson from "@/components/lessons/cardsLesson/CardsLesson";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import MultipleChoise from "@/components/lessons/multitpleChoise/MultipleChoise";

type LessonType = "video" | "cards" | "multipleChoice";


export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [dataNr, setDataNr] = useState(1)

  const handleNext = () => {
    setDataNr(dataNr + 1)
  }


  if (!id || !data[id]?.[dataNr]) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const LESSON_COMPONENTS: Record<LessonType, React.ReactNode> = {
    video: data[id][dataNr].type === 'video' ? 
      <VideoLesson key={dataNr} {...data[id][dataNr]} handleNext={handleNext} /> : null,
    cards: data[id][dataNr].type === 'cards' ? 
      <CardsLesson key={dataNr} data={data[id][dataNr].data} handleNext={handleNext} /> : null,
    multipleChoice: data[id][dataNr].type === 'multipleChoice' ? 
      <MultipleChoise key={dataNr} data={data[id][dataNr].data} handleNext={handleNext} /> : null,
  } as const;
  


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
