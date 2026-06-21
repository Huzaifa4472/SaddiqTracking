// A curated set of well-known, authentic azkar (remembrances) recommended for daily practice.
// Each entry: arabic text, transliteration, a short English meaning, recommended repetition,
// and the best time of day to recite it. This is a static, offline dataset — no network needed.

export const AZKAR = [
  {
    id: 'ayatul-kursi',
    title: 'Ayat al-Kursi',
    time: 'morning',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...',
    transliteration: 'Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum...',
    meaning: 'Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence.',
    count: '1 time',
    benefit: 'Protection throughout the day; one of the greatest verses in the Quran.',
  },
  {
    id: 'sayyidul-istighfar',
    title: 'Sayyid al-Istighfar (Master of Seeking Forgiveness)',
    time: 'morning',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ...',
    transliteration: 'Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana abduk...',
    meaning: "O Allah, You are my Lord, there is no god but You. You created me and I am Your servant.",
    count: '1 time',
    benefit: 'Whoever says it with conviction morning and evening enters Paradise if they die that day.',
  },
  {
    id: 'three-times-protection',
    title: 'Bismillah Protection Dua',
    time: 'morning',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ',
    transliteration: "Bismillahi alladhi la yadurru ma'a ismihi shay'un",
    meaning: 'In the name of Allah, with whose name nothing can cause harm.',
    count: '3 times',
    benefit: 'Protection from sudden harm until the next morning/evening.',
  },
  {
    id: 'tasbih-fatimi',
    title: 'Tasbih (Subhan Allah, Alhamdulillah, Allahu Akbar)',
    time: 'any',
    arabic: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَاللَّهُ أَكْبَرُ',
    transliteration: "Subhan Allah, Alhamdulillah, Allahu Akbar",
    meaning: 'Glory be to Allah, praise be to Allah, Allah is the Greatest.',
    count: '33 times each',
    benefit: 'Light on the tongue, heavy in reward; easy to do anywhere.',
  },
  {
    id: 'la-hawla',
    title: 'La Hawla wa la Quwwata illa Billah',
    time: 'any',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'La hawla wa la quwwata illa billah',
    meaning: 'There is no power nor strength except with Allah.',
    count: '10 times',
    benefit: 'A treasure from the treasures of Paradise; reduces anxiety and reliance on self.',
  },
  {
    id: 'salawat',
    title: 'Salutations Upon the Prophet ﷺ',
    time: 'any',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    transliteration: 'Allahumma salli ala Muhammad wa ala aali Muhammad',
    meaning: 'O Allah, send blessings upon Muhammad and the family of Muhammad.',
    count: '10 times',
    benefit: 'Brings ten blessings from Allah for every one said.',
  },
  {
    id: 'evening-protection',
    title: 'Evening Refuge Dua',
    time: 'evening',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: "A'udhu bikalimatillahi at-tammati min sharri ma khalaq",
    meaning: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    count: '3 times',
    benefit: 'Protection through the night from harm.',
  },
  {
    id: 'istighfar-general',
    title: 'General Istighfar',
    time: 'any',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    transliteration: 'Astaghfirullah',
    meaning: 'I seek forgiveness from Allah.',
    count: '100 times',
    benefit: 'Wipes away sins and softens the heart; the Prophet ﷺ said it daily.',
  },
  {
    id: 'dua-anxiety',
    title: 'Dua for Anxiety and Distress',
    time: 'any',
    arabic: 'اللَّهُمَّ إِنِّي عَبْدُكَ ابْنُ عَبْدِكَ...',
    transliteration: 'Allahumma inni abduka ibnu abdik...',
    meaning: 'O Allah, I am Your servant, son of Your servant...',
    count: '1 time',
    benefit: 'A dua taught by the Prophet ﷺ specifically for worry and grief.',
  },
  {
    id: 'morning-evening-mainstay',
    title: "Hasbunallahu wa ni'mal Wakeel",
    time: 'any',
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    transliteration: "Hasbunallahu wa ni'mal Wakeel",
    meaning: 'Allah is sufficient for us, and He is the best disposer of affairs.',
    count: '7 times',
    benefit: 'Strengthens trust (tawakkul) in Allah during hardship.',
  },
  {
    id: 'kalima-tayyiba',
    title: 'La ilaha illa Allah',
    time: 'any',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
    transliteration: 'La ilaha illa Allah',
    meaning: 'There is no god but Allah.',
    count: '100 times',
    benefit: 'The best of all remembrance; renews sincerity (ikhlas) in the heart.',
  },
  {
    id: 'dua-knowledge',
    title: 'Dua for Beneficial Knowledge',
    time: 'morning',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا',
    transliteration: "Allahumma inni as'aluka ilman nafi'an",
    meaning: 'O Allah, I ask You for knowledge that benefits.',
    count: '1 time',
    benefit: 'Begins the day asking for purposeful, beneficial knowledge and provision.',
  },
]

// Deterministic "pick of the day" — same azkar set shown to everyone on the same date,
// rotates through the list so it varies day to day without needing any backend or randomness.
export function getDailyAzkarSet(date = new Date(), count = 3) {
  const dayIndex = Math.floor(date.getTime() / (1000 * 60 * 60 * 24))
  const result = []
  for (let i = 0; i < count; i++) {
    const idx = (dayIndex + i) % AZKAR.length
    result.push(AZKAR[idx])
  }
  return result
}
