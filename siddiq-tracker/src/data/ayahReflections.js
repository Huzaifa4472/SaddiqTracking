// A curated set of Quranic verses chosen for their practical life lessons. Translations are
// kept short and paraphrased (not verbatim from any single translator) and paired with a brief,
// practical life-lesson reflection. Reference given as Surah:Ayah for the user to look up the
// full verse and translation of their choice.

export const AYAH_REFLECTIONS = [
  {
    reference: 'Quran 2:286',
    theme: 'Allah never burdens you beyond your capacity.',
    lesson: 'Whatever hardship you are facing, you have within you the capacity to bear it. Trust that your trial is measured to fit you, not to break you.',
  },
  {
    reference: 'Quran 94:5-6',
    theme: 'With every hardship comes ease.',
    lesson: 'Difficulty is never the end of the story — relief is built into the very fabric of hard seasons. Keep moving; the ease is already on its way.',
  },
  {
    reference: 'Quran 13:11',
    theme: 'Real change starts within.',
    lesson: 'Outer circumstances shift only after something shifts inside a person. If you want your situation to change, start with your own heart and habits.',
  },
  {
    reference: 'Quran 3:159',
    theme: 'Gentleness draws people closer.',
    lesson: 'Harshness pushes people away even when you are right. Choose soft, forgiving speech, and consult others — it builds trust and unity.',
  },
  {
    reference: 'Quran 49:12',
    theme: 'Avoid suspicion and backbiting.',
    lesson: 'Assuming the worst about people and speaking about them behind their backs erodes your own character. Guard your tongue and your assumptions.',
    },
  {
    reference: 'Quran 17:23-24',
    theme: 'Honor your parents.',
    lesson: 'Even a single sigh of impatience toward aging parents is warned against. Speak to them with the same gentleness you would want from your own children one day.',
  },
  {
    reference: 'Quran 16:90',
    theme: 'Justice, good conduct, and kindness to relatives.',
    lesson: 'Three things summarize a good life: dealing justly with everyone, doing what is excellent (not just adequate), and staying connected to family.',
  },
  {
    reference: 'Quran 39:53',
    theme: "Allah's mercy is never out of reach.",
    lesson: "No matter how far you feel you've fallen, the door to returning is never locked. Despair is the only sin too big to recover from quickly — so never despair.",
  },
  {
    reference: 'Quran 6:152',
    theme: 'Speak the truth even when it costs you.',
    lesson: 'Justice in speech applies even against your own relatives. Truthfulness is not negotiable based on who benefits from the lie.',
  },
  {
    reference: 'Quran 103:1-3',
    theme: 'Time is the resource you can never get back.',
    lesson: 'People are in loss except those who believe, do good, and remind each other of truth and patience. Spend today on something that outlasts today.',
  },
  {
    reference: 'Quran 23:1-2',
    theme: 'Humility in worship leads to success.',
    lesson: 'Presence of heart matters more than the motion of the body. Slow down in what you do for Allah and mean it.',
  },
  {
    reference: 'Quran 4:58',
    theme: 'Return what is entrusted to you.',
    lesson: 'Trust (amanah) is not optional — whatever is placed in your care, whether money, a secret, or a responsibility, must be returned exactly as it was given.',
  },
  {
    reference: 'Quran 41:34',
    theme: 'Repel evil with good.',
    lesson: 'Responding to harm with goodness can turn an enemy into a close friend. The higher response is almost always the better strategy too.',
  },
  {
    reference: 'Quran 2:152',
    theme: 'Remember Allah and He remembers you.',
    lesson: 'Gratitude and remembrance are not one-directional — the more consistently you remember your Creator in small moments, the more present that connection becomes.',
  },
  {
    reference: 'Quran 65:2-3',
    theme: 'Taqwa opens doors and provides for you.',
    lesson: 'Mindfulness of Allah in your choices tends to open ways out of difficulty that you could not have planned yourself. Trust the process, not just the plan.',
  },
  {
    reference: 'Quran 31:14',
    theme: 'Gratitude to parents alongside gratitude to Allah.',
    lesson: 'Thanking your Creator and honoring your parents are mentioned together — one rarely grows without the other.',
  },
  {
    reference: 'Quran 49:13',
    theme: 'Character outranks lineage.',
    lesson: 'People are not ranked by tribe, nationality, or wealth — the most honored among people is the one with the most taqwa (God-consciousness) and good character.',
  },
  {
    reference: 'Quran 17:53',
    theme: 'Speak in the best possible way.',
    lesson: "Even disagreements have a 'best way' to be said. Before you speak, ask whether your words are the kindest accurate version of the truth.",
  },
  {
    reference: 'Quran 2:153',
    theme: 'Patience and prayer as your support system.',
    lesson: 'When life gets heavy, the two tools always available to you are patience and turning to prayer — not avoidance, not despair.',
  },
  {
    reference: 'Quran 24:30',
    theme: 'Lowering the gaze protects the heart.',
    lesson: 'Small daily disciplines, like where you let your eyes linger, quietly shape the state of your heart over time.',
  },
  {
    reference: 'Quran 5:8',
    theme: 'Let justice override personal feelings.',
    lesson: "Don't let dislike of someone cause you to act unjustly toward them. Fairness should not depend on whether you like the person.",
  },
  {
    reference: 'Quran 2:263',
    theme: 'A kind word is better than charity followed by hurt.',
    lesson: 'How you give matters as much as what you give. A respectful word costs nothing and protects the dignity of the person receiving help.',
  },
  {
    reference: 'Quran 76:9',
    theme: 'Sincerity removes the need for recognition.',
    lesson: 'The strongest acts of generosity are the ones done expecting nothing back — not even a thank you.',
  },
  {
    reference: 'Quran 3:134',
    theme: 'Control anger and forgive.',
    lesson: 'Among the qualities of those who excel are spending in ease and hardship alike, restraining anger, and forgiving people — three things that are hardest exactly when most needed.',
  },
  {
    reference: 'Quran 17:34',
    theme: 'Fulfill your promises.',
    lesson: 'A promise is something you will be asked about. Treat your word as a debt you owe, not a suggestion you made.',
  },
]

// Deterministic pick of the day, same logic style as azkar — rotates by calendar day.
export function getDailyAyah(date = new Date()) {
  const dayIndex = Math.floor(date.getTime() / (1000 * 60 * 60 * 24))
  return AYAH_REFLECTIONS[dayIndex % AYAH_REFLECTIONS.length]
}
