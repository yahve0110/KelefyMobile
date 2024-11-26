import { View, StyleSheet, Text } from "react-native";
import VideoLesson from "@/components/lessons/videoLesson/VideoLesson";
import Colors from "@/constants/Colors";
import { data } from "@/data";
import CardsLesson from "@/components/lessons/cardsLesson/CardsLesson";
import { useState, useEffect, useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import MultipleChoise from "@/components/lessons/multitpleChoise/MultipleChoise";
import Matching from "@/components/lessons/matching/Matching";
import BuildSentence from "@/components/lessons/buildSentence/BuildSentence";
import FinishScreen from "@/components/lessons/finishScreen/FinishScreen";
import { ProgressContext } from "./_layout";
import React from "react";

type LessonType =
  | "video"
  | "cards"
  | "multipleChoice"
  | "matching"
  | "buildSentence"
  | "finish";

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { updateProgress } = useContext(ProgressContext); // Use the context
  const [dataNr, setDataNr] = useState(1);



  const handleNext = () => {
    setDataNr((prev) => {
      const nextStep = prev + 1;
      const totalSteps = 7; // Total steps (e.g., max 7)
      const progress = Math.min(Math.round((nextStep / totalSteps) * 100), 100); // Calculate progress percentage
  
      updateProgress(progress); // Pass the progress percentage to the context function
      return nextStep;
    });
  };
  

  useEffect(() => {
    const lessonData = data[id] as any[];
    if (!lessonData) return;

    const totalSteps = lessonData.length;
    const currentProgress = Math.min(
      Math.round(((dataNr + 1) / totalSteps) * 100), // Calculate progress
      100
    );

    updateProgress(currentProgress); // Update context with calculated progress
  }, [dataNr, id, updateProgress]); // Add dependencies to avoid stale values

  const LESSON_COMPONENTS: Record<LessonType, React.ReactNode> = {
    video:
      data[id][dataNr]?.type === "video" ? (
        <VideoLesson
          key={`${id}-${dataNr}`}
          {...data[id][dataNr]}
          handleNext={handleNext}
        />
      ) : null,
    cards:
      data[id][dataNr]?.type === "cards" ? (
        <CardsLesson
          key={`${id}-${dataNr}`}
          data={data[id][dataNr].data}
          handleNext={handleNext}
        />
      ) : null,
    multipleChoice:
      data[id][dataNr]?.type === "multipleChoice" ? (
        <MultipleChoise
          key={`${id}-${dataNr}`}
          data={data[id][dataNr].data}
          handleNext={handleNext}
        />
      ) : null,
    matching:
      data[id][dataNr]?.type === "matching" ? (
        <Matching
          key={`${id}-${dataNr}`}
          data={data[id][dataNr].data}
          handleNext={handleNext}
        />
      ) : null,
    buildSentence:
      data[id][dataNr]?.type === "buildSentence" ? (
        <BuildSentence
          key={`${id}-${dataNr}`}
          data={data[id][dataNr].data}
          handleNext={handleNext}
        />
      ) : null,
    finish:
      data[id][dataNr]?.type === "finish" ? (
        <FinishScreen key={`${id}-${dataNr}`} />
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
