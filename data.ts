interface Card {
  en: string;
  et: string;
  image_url: string;
  audio_url: string;
  description: string;
}

interface VideoStep {
  type: 'video';
  href: string;
  nextType: 'cards';
}

interface CardsStep {
  type: 'cards';
  data: Card[];
}

type LessonStep = VideoStep | CardsStep;

interface Lesson {
  [stepNumber: number]: LessonStep;
}

interface LessonsData {
  [lessonId: string]: Lesson;
}

export const data: LessonsData = {
  "c807e076-8ee0-46ee-a2e7-ed5b87dffca0": {
    1: {
      type: "video",
      href: "https://app.heygen.com/embeds/4dd02802245f45909d092aad7d0458c7",
      nextType: "cards",
    },
    2: {
      type: "cards",
      data: [
        {
          en: "Hello!",
          et: "Tere!",
          image_url: "https://firebasestorage.googleapis.com/...",
          audio_url: "https://www.book2.nl/book2/ET/SOUND/0043.mp3",
          description: "A common informal greeting."
        }
      ]
    },
  },
};
