/**
 * Mock Kanji Data
 * Sample data for development and testing
 */

import type { Kanji } from "@/types";

export const kanjiData: Kanji[] = [
  // N5 Kanji
  {
    id: "水",
    character: "水",
    jlptLevel: "N5",
    strokes: 4,
    onyomi: ["スイ"],
    kunyomi: ["みず"],
    meanings: ["water"],
    examples: [
      {
        japanese: "水をください。",
        romaji: "Mizu o kudasai.",
        english: "Please give me water.",
      },
    ],
    radical: {
      character: "水",
      name: "Water",
      number: 85,
    },
  },
  {
    id: "木",
    character: "木",
    jlptLevel: "N5",
    strokes: 4,
    onyomi: ["ボク", "モク"],
    kunyomi: ["き", "こ-"],
    meanings: ["tree", "wood"],
    examples: [
      {
        japanese: "木に登る。",
        romaji: "Ki ni noboru.",
        english: "Climb a tree.",
      },
    ],
    radical: {
      character: "木",
      name: "Tree",
      number: 75,
    },
  },
  {
    id: "川",
    character: "川",
    jlptLevel: "N5",
    strokes: 3,
    onyomi: ["セン"],
    kunyomi: ["かわ"],
    meanings: ["river"],
    examples: [
      {
        japanese: "川で泳ぐ。",
        romaji: "Kawa de oyogu.",
        english: "Swim in the river.",
      },
    ],
    radical: {
      character: "川",
      name: "River",
      number: 47,
    },
  },
  {
    id: "猫",
    character: "猫",
    jlptLevel: "N5",
    strokes: 11,
    onyomi: ["ビョウ"],
    kunyomi: ["ねこ"],
    meanings: ["cat"],
    examples: [
      {
        japanese: "猫が好きです。",
        romaji: "Neko ga suki desu.",
        english: "I like cats.",
      },
    ],
    radical: {
      character: "犬",
      name: "Dog",
      number: 94,
    },
  },
  // N4 Kanji
  {
    id: "海",
    character: "海",
    jlptLevel: "N4",
    strokes: 9,
    onyomi: ["カイ"],
    kunyomi: ["うみ"],
    meanings: ["sea", "ocean"],
    examples: [
      {
        japanese: "海に行く。",
        romaji: "Umi ni iku.",
        english: "Go to the sea.",
      },
    ],
    radical: {
      character: "水",
      name: "Water",
      number: 85,
    },
  },
  {
    id: "注意",
    character: "注意",
    jlptLevel: "N4",
    strokes: 12,
    onyomi: ["チュウ", "イ"],
    kunyomi: [],
    meanings: ["caution", "attention", "notice"],
    examples: [
      {
        japanese: "注意してください。",
        romaji: "Chuui shite kudasai.",
        english: "Please pay attention.",
      },
    ],
    radical: {
      character: "言",
      name: "Speech",
      number: 149,
    },
  },
  // N3 Kanji
  {
    id: "学",
    character: "学",
    jlptLevel: "N3",
    strokes: 8,
    onyomi: ["ガク"],
    kunyomi: ["まな・ぶ"],
    meanings: ["study", "learning", "science"],
    examples: [
      {
        japanese: "私は大学で学んでいます。",
        romaji: "Watashi wa daigaku de manande imasu.",
        english: "I am studying at a university.",
      },
      {
        japanese: "数学はとても難しいです。",
        romaji: "Suugaku wa totemo muzukashii desu.",
        english: "Mathematics is very difficult.",
      },
    ],
    radical: {
      character: "子",
      name: "Child",
      number: 39,
    },
  },
  {
    id: "森",
    character: "森",
    jlptLevel: "N3",
    strokes: 12,
    onyomi: ["シン"],
    kunyomi: ["もり"],
    meanings: ["forest"],
    examples: [
      {
        japanese: "森を散歩する。",
        romaji: "Mori o sanpo suru.",
        english: "Take a walk in the forest.",
      },
    ],
    radical: {
      character: "木",
      name: "Tree",
      number: 75,
    },
  },
  {
    id: "準備",
    character: "準備",
    jlptLevel: "N3",
    strokes: 16,
    onyomi: ["ジュン", "ビ"],
    kunyomi: [],
    meanings: ["preparation", "ready"],
    examples: [
      {
        japanese: "旅行の準備をする。",
        romaji: "Ryokou no junbi o suru.",
        english: "Make preparations for the trip.",
      },
    ],
    radical: {
      character: "人",
      name: "Person",
      number: 9,
    },
  },
  {
    id: "草",
    character: "草",
    jlptLevel: "N3",
    strokes: 9,
    onyomi: ["ソウ"],
    kunyomi: ["くさ"],
    meanings: ["grass", "herb", "weed"],
    examples: [
      {
        japanese: "草を刈る。",
        romaji: "Kusa o karu.",
        english: "Cut the grass.",
      },
    ],
    radical: {
      character: "艸",
      name: "Grass",
      number: 140,
    },
  },
  // N2 Kanji
  {
    id: "嵐",
    character: "嵐",
    jlptLevel: "N2",
    strokes: 9,
    onyomi: ["ラン"],
    kunyomi: ["あらし"],
    meanings: ["storm", "tempest"],
    examples: [
      {
        japanese: "嵐が来る。",
        romaji: "Arashi ga kuru.",
        english: "A storm is coming.",
      },
    ],
    radical: {
      character: "山",
      name: "Mountain",
      number: 46,
    },
  },
  {
    id: "雲",
    character: "雲",
    jlptLevel: "N2",
    strokes: 12,
    onyomi: ["ウン"],
    kunyomi: ["くも"],
    meanings: ["cloud"],
    examples: [
      {
        japanese: "雲が高い。",
        romaji: "Kumo ga takai.",
        english: "The clouds are high.",
      },
    ],
    radical: {
      character: "雨",
      name: "Rain",
      number: 173,
    },
  },
  {
    id: "覚悟",
    character: "覚悟",
    jlptLevel: "N2",
    strokes: 16,
    onyomi: ["カク", "ゴ"],
    kunyomi: ["さと・る"],
    meanings: ["readiness", "resolution", "acceptance"],
    examples: [
      {
        japanese: "覚悟を決める。",
        romaji: "Kakugo o kimeru.",
        english: "Make up one's mind.",
      },
    ],
    radical: {
      character: "見",
      name: "See",
      number: 147,
    },
  },
  // N1 Kanji
  {
    id: "雫",
    character: "雫",
    jlptLevel: "N1",
    strokes: 11,
    onyomi: ["ダ"],
    kunyomi: ["しずく"],
    meanings: ["drop", "droplet"],
    examples: [
      {
        japanese: "雨の雫。",
        romaji: "Ame no shizuku.",
        english: "Raindrop.",
      },
    ],
    radical: {
      character: "雨",
      name: "Rain",
      number: 173,
    },
  },
  {
    id: "把握",
    character: "把握",
    jlptLevel: "N1",
    strokes: 16,
    onyomi: ["ハ", "アク"],
    kunyomi: [],
    meanings: ["grasp", "fathom", "understand"],
    examples: [
      {
        japanese: "状況を把握する。",
        romaji: "Joukyou o haaku suru.",
        english: "Grasp the situation.",
      },
    ],
    radical: {
      character: "手",
      name: "Hand",
      number: 64,
    },
  },
];
