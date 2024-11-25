import Colors from "@/constants/Colors";
import React from "react";
import { Text, View,StyleSheet } from "react-native";

interface Card {
    en: string;
    et: string;
    image_url: string;
    audio_url: string;
    description: string;
  }

interface Props {
  data: Card[];

}

const CardsLesson: React.FC<Props> = (props:Props) => {
    const {data} = props
  return (
    <View>
      <Text>{data[0].description}</Text>
    </View>
  );
};

export default CardsLesson;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.light.background,
    },
  });
  