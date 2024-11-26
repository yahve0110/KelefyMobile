import Colors from '@/constants/Colors';
import { BuildSentenceQuestion } from '@/data';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

interface Props {
    handleNext: () => void;
    data: BuildSentenceQuestion[];
  }

const BuildSentence = (props:Props) => {
    const {handleNext, data} = props;
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const handleSelectAnswer = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      Alert.alert('Choose an answer!');
      return;
    }

    if (selectedAnswer === data[currentPhraseIndex].correctAnswer) {
      setIsAnswerCorrect(true);
      setCorrectAnswersCount(correctAnswersCount + 1);
      setTimeout(() => {
        if (currentPhraseIndex < data.length - 1) {
          setCurrentPhraseIndex(currentPhraseIndex + 1);
          setSelectedAnswer(null);
          setIsAnswerCorrect(null);
        } else {
          Alert.alert(`Exercise completed! Correct answers: ${correctAnswersCount}`);
          setCurrentPhraseIndex(0);
          setCorrectAnswersCount(0);
        }
      }, 500);
    } else {
      setIsAnswerCorrect(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose the correct word:</Text>

      <View style={styles.phraseContainer}>
        <Text style={styles.phrase}>
          {data[currentPhraseIndex].sentence.replace('____', selectedAnswer || '____')}
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        {data[currentPhraseIndex].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedAnswer === option
                ? { backgroundColor: '#d3d3d3' }
                : isAnswerCorrect === false && selectedAnswer === option
                ? { backgroundColor: 'red' }
                : {}
            ]}
            onPress={() => handleSelectAnswer(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.resultContainer}>
        <Text 
          style={[
            styles.result, 
            { color: isAnswerCorrect ? 'green' : 'red' },
            !isAnswerCorrect && !selectedAnswer ? styles.hidden : null
          ]}
        >
          {isAnswerCorrect !== null 
            ? (isAnswerCorrect ? 'Correct!' : 'Incorrect, try again!') 
            : ' '}
        </Text>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAnswer}>
        <Text style={styles.submitText}>Submit answer</Text>
      </TouchableOpacity>

      <Text style={styles.score}>Correct answers: {correctAnswersCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:Colors.light.text,
    marginBottom: 20,
  },
  phraseContainer: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  phrase: {
    fontSize: 26,
    color: Colors.light.text,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  optionsContainer: {
    minHeight: 150,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginBottom: 20,
    width: '100%',
  },
  option: {
    padding: 15,
    borderRadius: 8,
    minWidth: 100,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.light.itemsColor,
  },
  resultContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '50%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  score: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default BuildSentence;
