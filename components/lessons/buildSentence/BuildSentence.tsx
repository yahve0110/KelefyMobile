import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const phrases = [
  {
    en: "Hello! ____",
    correctAnswer: "Tere!",
    options: ["Tere!", "Tere päevast!", "Hästi!", "Tere õhtust!"]
  },
  {
    en: "Good day! ____",
    correctAnswer: "Tere päevast!",
    options: ["Tere!", "Tere päevast!", "Hästi!", "Tere õhtust!"]
  },
  {
    en: "Good morning! ____",
    correctAnswer: "Tere hommikust!",
    options: ["Tere hommikust!", "Hästi!", "Tere õhtust!", "Tere!"]
  },
  {
    en: "How are you? ____",
    correctAnswer: "Kuidas läheb?",
    options: ["Tere!", "Kuidas läheb?", "Hästi!", "Tere õhtust!"]
  },
  {
    en: "Good! ____",
    correctAnswer: "Hästi!",
    options: ["Tere!", "Tere hommikust!", "Hästi!", "Tere õhtust!"]
  },
  {
    en: "Good evening! ____",
    correctAnswer: "Tere õhtust!",
    options: ["Tere õhtust!", "Tere hommikust!", "Hästi!", "Tere!"]
  }
];

const BuildSentence = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const handleSelectAnswer = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      Alert.alert('Выберите ответ!');
      return;
    }

    if (selectedAnswer === phrases[currentPhraseIndex].correctAnswer) {
      setIsAnswerCorrect(true);
      setCorrectAnswersCount(correctAnswersCount + 1);
      setTimeout(() => {
        if (currentPhraseIndex < phrases.length - 1) {
          setCurrentPhraseIndex(currentPhraseIndex + 1);
          setSelectedAnswer(null);
          setIsAnswerCorrect(null);
        } else {
          Alert.alert(`Упражнение завершено! Правильных ответов: ${correctAnswersCount}`);
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
      <Text style={styles.title}>Выберите правильное слово для предложения:</Text>

      <Text style={styles.phrase}>
        {phrases[currentPhraseIndex].en.replace('____', selectedAnswer || '____')}
      </Text>

      <View style={styles.optionsContainer}>
        {phrases[currentPhraseIndex].options.map((option, index) => (
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

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAnswer}>
        <Text style={styles.submitText}>Подтвердить ответ</Text>
      </TouchableOpacity>

      {isAnswerCorrect !== null && (
        <Text style={[styles.result, { color: isAnswerCorrect ? 'green' : 'red' }]}>
          {isAnswerCorrect ? 'Правильно!' : 'Неправильно, попробуйте снова!'}
        </Text>
      )}

      <Text style={styles.score}>Правильных ответов: {correctAnswersCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  phrase: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 20,
  },
  option: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e5e5',
    backgroundColor: '#fff',
    margin: 10,
    width: 120,
    textAlign: 'center',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  score: {
    marginTop: 20,
    fontSize: 14,
    color: 'gray',
  },
});

export default BuildSentence;
