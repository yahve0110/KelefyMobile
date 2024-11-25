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
            image_url:
              "https://firebasestorage.googleapis.com/v0/b/keelefy.appspot.com/o/lesson1%2Fhello_1.png?alt=media&token=78bed978-afe7-4c69-9816-00bd71141f16",
            audio_url: "https://www.book2.nl/book2/ET/SOUND/0043.mp3",
            description: "A common informal greeting.",
          },
          {
            en: "Good day!",
            et: "Tere päevast!",
            description: "A more formal greeting used during the day.",
            audio_url: "https://www.book2.nl/book2/ET/SOUND/0044.mp3",
            image_url:
              "https://firebasestorage.googleapis.com/v0/b/keelefy.appspot.com/o/lesson1%2Fhello_2.png?alt=media&token=7a28a257-8d06-4888-8ba9-f076c920d16c",
          },
          {
            en: "Good morning!",
            et: "Tere hommikust!",
            description: "A morning greeting.",
            audio_url:
              "https://firebasestorage.googleapis.com/v0/b/keelefy.appspot.com/o/lesson1%2FTere%20hommikust!.mp3?alt=media&token=9f73128f-5552-4117-bba1-64e88c083a3e",
            image_url:
              "https://firebasestorage.googleapis.com/v0/b/keelefy.appspot.com/o/lesson1%2Fmorning.png?alt=media&token=19595786-ead5-4479-9154-de8da1e5142d",
          },
          {
            en: "How are you?",
            et: "Kuidas läheb?",
            audio_url: "https://www.book2.nl/book2/ET/SOUND/0045.mp3",
            image_url:
              "https://firebasestorage.googleapis.com/v0/b/keelefy.appspot.com/o/lesson1%2FhowIsGoing.jpeg?alt=media&token=d2fd54bd-512a-46a3-bd7b-dfe65387c0b7",
            description:
              "A question about the well-being of the person being addressed.",
          },
          {
            en: "Good!",
            et: "Hästi!",
            audio_url:
              "https://firebasestorage.googleapis.com/v0/b/keelefy.appspot.com/o/lesson1%2Fh%C3%A4sti%20.mp3?alt=media&token=f43375ae-3581-42bf-a089-a4ed68155ec7",
            image_url:
              "https://firebasestorage.googleapis.com/v0/b/keelefy.appspot.com/o/lesson1%2Fgood.jpeg?alt=media&token=c7cd5196-a73f-4e1c-9941-6d28d23a38b0",
            description: "A response to the question about one's well-being.",
          },
          {
            en: "Good evening!",
            et: "Tere õhtust!",
            audio_url:
              "https://firebasestorage.googleapis.com/v0/b/keelefy.appspot.com/o/lesson1%2FTere%20%C3%B5htust!.mp3?alt=media&token=8c325087-82cb-4d53-9f10-6b433a0c8793",
            image_url:
              "https://firebasestorage.googleapis.com/v0/b/keelefy.appspot.com/o/lesson1%2Fevening.png?alt=media&token=55b07c69-705e-480a-ab1d-dd898cb8fa45",
            description: "A greeting used in the evening.",
          },
      ]
    },
  },
};
