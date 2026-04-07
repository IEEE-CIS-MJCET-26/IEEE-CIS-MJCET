const jeopardyData = [
  {
    category: "Romance",
    questions: [
      {
        points: 100,
        question: "In which 1997 film does Jack say, 'I'm the king of the world!'?",
        answer: "Titanic",
        used: false,
      },
      {
        points: 200,
        question: "Which romantic comedy features a bookstore owner and a famous actress in Notting Hill, London?",
        answer: "Notting Hill (1999)",
        used: false,
      },
      {
        points: 300,
        question: "In 'The Notebook', what does Noah build to win Allie back?",
        answer: "A house (the plantation house she always dreamed of)",
        used: false,
      },
      {
        points: 400,
        question: "Which 2004 film features a man who erases memories of his ex-girlfriend, only to regret it midway through the procedure?",
        answer: "Eternal Sunshine of the Spotless Mind",
        used: false,
      },
      {
        points: 500,
        question: "In 'Before Sunrise' (1995), in which European city do Jesse and Céline spend the night wandering and talking?",
        answer: "Vienna, Austria",
        used: false,
      },
    ],
  },
  {
    category: "Drama",
    questions: [
      {
        points: 100,
        question: "Which 1994 drama follows a man sitting on a bench telling his life story to strangers?",
        answer: "Forrest Gump",
        used: false,
      },
      {
        points: 200,
        question: "In 'The Shawshank Redemption', what does Andy Dufresne use to tunnel out of prison over 19 years?",
        answer: "A rock hammer (hidden inside a Bible)",
        used: false,
      },
      {
        points: 300,
        question: "Which film features the line: 'I drink your milkshake! I drink it up!'?",
        answer: "There Will Be Blood (2007)",
        used: false,
      },
      {
        points: 400,
        question: "In '12 Angry Men' (1957), how many jurors initially vote 'not guilty' at the start of deliberation?",
        answer: "One (Juror #8, played by Henry Fonda)",
        used: false,
      },
      {
        points: 500,
        question: "Which 2019 Korean film became the first non-English language film to win the Academy Award for Best Picture?",
        answer: "Parasite (directed by Bong Joon-ho)",
        used: false,
      },
    ],
  },
  {
    category: "Comedy",
    questions: [
      {
        points: 100,
        question: "In 'Home Alone', what is the name of the kid who is accidentally left behind?",
        answer: "Kevin McCallister",
        used: false,
      },
      {
        points: 200,
        question: "Which 2004 comedy features a group of friends who form a news team in the 1970s San Diego?",
        answer: "Anchorman: The Legend of Ron Burgundy",
        used: false,
      },
      {
        points: 300,
        question: "In 'The Grand Budapest Hotel', what is the name of the fictional country where the hotel is located?",
        answer: "The Republic of Zubrowka",
        used: false,
      },
      {
        points: 400,
        question: "Which 1980 comedy features a character saying 'I'm kind of a big deal' — wait, wrong movie. Actually: 'We came, we saw, we kicked its…'?",
        answer: "Ghostbusters (Bill Murray as Peter Venkman)",
        used: false,
      },
      {
        points: 500,
        question: "In 'Monty Python and the Holy Grail', what is the airspeed velocity of an unladen swallow (according to the film)?",
        answer: "An African or European swallow? (The question itself is the joke — answering it wrong sends you into the Gorge of Eternal Peril)",
        used: false,
      },
    ],
  },
  {
    category: "Action",
    questions: [
      {
        points: 100,
        question: "Which action franchise stars Keanu Reeves as a retired hitman who goes on a rampage after his dog is killed?",
        answer: "John Wick",
        used: false,
      },
      {
        points: 200,
        question: "In 'Mad Max: Fury Road', what is the name of Charlize Theron's character?",
        answer: "Imperator Furiosa",
        used: false,
      },
      {
        points: 300,
        question: "Which 1988 action film takes place almost entirely inside Nakatomi Plaza?",
        answer: "Die Hard",
        used: false,
      },
      {
        points: 400,
        question: "In 'The Matrix', what color pill does Neo take to learn the truth about reality?",
        answer: "The red pill",
        used: false,
      },
      {
        points: 500,
        question: "In 'Inception', what is the spinning top supposed to indicate when it doesn't stop spinning?",
        answer: "That the person is still inside a dream (it's Cobb's totem)",
        used: false,
      },
    ],
  },
  {
    category: "Horror",
    questions: [
      {
        points: 100,
        question: "In which horror film does a boy say, 'I see dead people'?",
        answer: "The Sixth Sense (1999)",
        used: false,
      },
      {
        points: 200,
        question: "What is the name of the possessed doll in 'The Conjuring' universe?",
        answer: "Annabelle",
        used: false,
      },
      {
        points: 300,
        question: "In 'Get Out' (2017), what does the Armitage family use to hypnotize their victims?",
        answer: "A teacup (stirring a teacup to trigger the 'Sunken Place')",
        used: false,
      },
      {
        points: 400,
        question: "Which 1980 Stanley Kubrick horror film features the Overlook Hotel and the phrase 'All work and no play makes Jack a dull boy'?",
        answer: "The Shining",
        used: false,
      },
      {
        points: 500,
        question: "In 'Hereditary' (2018), what is the name of the demon that the cult is trying to summon?",
        answer: "Paimon (King Paimon)",
        used: false,
      },
    ],
  },
  {
    category: "Superhero",
    questions: [
      {
        points: 100,
        question: "What is the name of Thor's enchanted hammer?",
        answer: "Mjölnir",
        used: false,
      },
      {
        points: 200,
        question: "In 'The Dark Knight', who plays the Joker?",
        answer: "Heath Ledger",
        used: false,
      },
      {
        points: 300,
        question: "Which Infinity Stone does Doctor Strange guard?",
        answer: "The Time Stone (Eye of Agamotto)",
        used: false,
      },
      {
        points: 400,
        question: "In 'Spider-Man: Into the Spider-Verse', what is the real name of the main Spider-Man protagonist?",
        answer: "Miles Morales",
        used: false,
      },
      {
        points: 500,
        question: "In 'Logan' (2017), what is the in-universe designation of the virus that stopped new mutants from being born?",
        answer: "Genetically modified corn syrup / HGC (engineered by Transigen in food supply to suppress the X-gene)",
        used: false,
      },
    ],
  },
];

export default jeopardyData;
