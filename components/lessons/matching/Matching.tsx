import Colors from "@/constants/Colors";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

import { MatchingQuestion } from "@/data";

interface Props {
  handleNext: () => void;
  data: MatchingQuestion[];
}

const Matching = (props: Props) => {
  const { handleNext, data } = props;
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [targetPositions, setTargetPositions] = useState<Record<
    string,
    { x: number; y: number; width: number; height: number }
  >>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Преобразуем данные в нужный формат
  const words = data[0].wordsFrom.map((word, index) => {
    const mappedWord = {
      id: word.id,
      source: word.text,
      target: data[0].wordsTo[index].text,
    };
    console.log('Mapping word:', mappedWord);
    return mappedWord;
  });

  const containerRef = useRef<View>(null);
  const [containerPosition, setContainerPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('Mapped words:', words);
    console.log('Target positions:', targetPositions);
  }, [words, targetPositions]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.measure((x, y, width, height, pageX, pageY) => {
        setContainerPosition({ x: pageX, y: pageY });
      });
    }
  }, []);

  useEffect(() => {
    if (isCompleted) {
      handleNext();
    }
  }, [isCompleted, handleNext]);

  const onMatch = (id: string) => {
    setMatches((prev) => {
        const newMatches = {
            ...prev,
            [id]: words.find((word) => word.id === id)?.target || "",
        };
        
        // Проверяем, все ли слова совпали
        const allWordsMatched = words.every(word => newMatches[word.id]);
        
        if (allWordsMatched) {
            console.log('🎉 All words successfully matched!', {
                matches: newMatches,
                totalWords: words.length,
                matchedWords: Object.keys(newMatches).length,
                words: words.map(word => ({
                    id: word.id,
                    source: word.source,
                    target: word.target,
                    matched: newMatches[word.id]
                }))
            });
            setIsCompleted(true);
        }
        
        return newMatches;
    });
    
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <View
      ref={containerRef}
      style={styles.container}
      onLayout={() => {
        if (containerRef.current) {
          containerRef.current.measure((x, y, width, height, pageX, pageY) => {
            setContainerPosition({ x: pageX, y: pageY });
          });
        }
      }}
    >
      <View style={styles.sourceContainer}>
        {words.map((word, index) => (
          <View
            key={word.id}
            style={[
              styles.wordSlot,
              { marginTop: index > 0 ? 16 : 0 }
            ]}
          >
            <Text style={styles.sourceText}>{word.source}</Text>
            <View
              style={styles.targetSlot}
              onLayout={(event) => {
                const { x, y, width, height } = event.nativeEvent.layout;
                const absoluteY = y + (index * (38 + 16));
                setTargetPositions((prev) => ({
                  ...prev,
                  [word.id]: {
                    x,
                    y: absoluteY,
                    width,
                    height,
                  },
                }));
              }}
            >
              <Text
                style={[
                  styles.matchedText,
                  matches[word.id] ? styles.matchedTextCorrect : null,
                ]}
              >
                {matches[word.id] || ""}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.draggableContainer}>
        {words.map(
          (word) =>
            !matches[word.id] && (
              <DraggableWord
                key={word.id}
                word={word}
                targetPosition={targetPositions[word.id]}
                targetPositions={targetPositions}
                onMatch={onMatch} containerPosition={{
                  x: 0,
                  y: 0
                }}              />
            )
        )}
      </View>
    </View>
  );
};

type DraggableWordProps = {
  word: { id: string; source: string; target: string };
  targetPosition: { x: number; y: number; width: number; height: number } | undefined;
  targetPositions: Record<string, { x: number; y: number; width: number; height: number }>;
  onMatch: (id: string) => void;
  containerPosition: { x: number; y: number };
};

const DraggableWord = ({
  word,
  targetPosition,
  targetPositions,
  onMatch,
  containerPosition,
}: DraggableWordProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const backgroundColor = useSharedValue("#FFFFFF");
  const borderColorValue = useSharedValue("#e5e5e5");

  const checkMatch = (x: number, y: number) => {
    const currentTargetPosition = targetPositions[word.id];
    if (!currentTargetPosition) return false;

    // Увеличиваем пороги для длинных слов
    const BASE_THRESHOLD_X = 60;
    const BASE_THRESHOLD_Y = 80;
    
    // Дополнительный порог для длинных слов
    const lengthFactor = word.target.length > 10 ? 1.5 : 1;
    const THRESHOLD_X = BASE_THRESHOLD_X * lengthFactor;
    const THRESHOLD_Y = BASE_THRESHOLD_Y * lengthFactor;

    // Расчёт центра цели с учётом размера слова
    const targetCenterX = currentTargetPosition.x + (currentTargetPosition.width / 2);
    const targetCenterY = currentTargetPosition.y + (currentTargetPosition.height / 2);

    // Позиция перетаскиваемого элемента с корректировкой
    const dragX = x - containerPosition.x;
    const dragY = y - containerPosition.y;

    // Расстояние с учетом смещения
    const deltaX = Math.abs(dragX - targetCenterX);
    const deltaY = Math.abs(dragY - targetCenterY);

    console.log('Match check:', {
        word: word.target,
        length: word.target.length,
        thresholds: { x: THRESHOLD_X, y: THRESHOLD_Y },
        delta: { x: deltaX, y: deltaY },
        position: { drag: { x: dragX, y: dragY }, target: { x: targetCenterX, y: targetCenterY } }
    });

    if (deltaX <= THRESHOLD_X && deltaY <= THRESHOLD_Y) {
        // При совпадении - более плавная анимация
        const finalX = targetCenterX - dragX;
        const finalY = targetCenterY - dragY;
        
        translateX.value = withSpring(finalX, {
            damping: 20,
            stiffness: 200,
            mass: 1
        });
        translateY.value = withSpring(finalY, {
            damping: 20,
            stiffness: 200,
            mass: 1
        });
        
        backgroundColor.value = '#4CAF50';
        borderColorValue.value = '#4CAF50';
        runOnJS(onMatch)(word.id);
        return true;
    }

    // При промахе
    backgroundColor.value = '#FF5252';
    borderColorValue.value = '#FF5252';
    setTimeout(() => {
        translateX.value = withSpring(0, {
            damping: 15,
            stiffness: 150
        });
        translateY.value = withSpring(0, {
            damping: 15,
            stiffness: 150
        });
        backgroundColor.value = '#FFFFFF';
        borderColorValue.value = '#e5e5e5';
    }, 800);
    return false;
  };
  

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      const finalX = event.absoluteX;
      const finalY = event.absoluteY;
      runOnJS(checkMatch)(finalX, finalY);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    backgroundColor: backgroundColor.value,
    borderColor: borderColorValue.value,
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.draggableWord, animatedStyle]}>
        <Text style={styles.draggableText}>{word.target}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
  },
  sourceContainer: {
    flex: 1,
  },
  wordSlot: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  sourceText: {
    flex: 1,
    fontSize: 16,
    color: "white",
  },
  targetSlot: {
    width: 140,
    height: 45,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.light.itemsColor,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    overflow: "hidden",
  },
  matchedText: {
    fontSize: 14,
    textAlign: "center",
    color: "black",
    width: "100%",
    height: "100%",
    textAlignVertical: "center",
    paddingHorizontal: 8,
  },
  matchedTextCorrect: {
    backgroundColor: Colors.light.green,
    borderRadius: 8,
    color: "white",
    borderWidth: 2,
    fontSize: 16,
    borderColor: Colors.light.green,
  },
  draggableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 16,
    justifyContent: "center",

  },
  draggableWord: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#e5e5e5",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    fontSize:14,

  },
  draggableText: {
    fontSize: 16,

  },
});

export default Matching;
