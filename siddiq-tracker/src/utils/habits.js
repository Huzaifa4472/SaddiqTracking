// Central definition of every habit tracked by the app, grouped by Siddiq category.
// Nothing here may be removed without removing a quality of "Siddiq" character — so
// this list is intentionally exhaustive and stable across app versions.

export const CATEGORIES = {
  spiritual: { key: 'spiritual', label: 'Spiritual', color: '#1E8449' },
  truthfulness: { key: 'truthfulness', label: 'Truthfulness', color: '#2E86AB' },
  amanah: { key: 'amanah', label: 'Amanah (Trust)', color: '#C9A227' },
  character: { key: 'character', label: 'Character', color: '#8E44AD' },
  family: { key: 'family', label: 'Family', color: '#D35400' },
  socialGood: { key: 'socialGood', label: 'Social Good', color: '#16A085' },
  selfDiscipline: { key: 'selfDiscipline', label: 'Self Discipline', color: '#2C3E50' },
}

// Each habit: { id, label, category }
export const HABITS = [
  // Spiritual
  { id: 'fajrOnTime', label: 'Fajr on Time', category: 'spiritual' },
  { id: 'dhuhrOnTime', label: 'Dhuhr on Time', category: 'spiritual' },
  { id: 'asrOnTime', label: 'Asr on Time', category: 'spiritual' },
  { id: 'maghribOnTime', label: 'Maghrib on Time', category: 'spiritual' },
  { id: 'ishaOnTime', label: 'Isha on Time', category: 'spiritual' },
  { id: 'quranRecitation', label: 'Quran Recitation', category: 'spiritual' },
  { id: 'quranUnderstanding', label: 'Quran Understanding', category: 'spiritual' },
  { id: 'morningAdhkar', label: 'Morning Adhkar', category: 'spiritual' },
  { id: 'eveningAdhkar', label: 'Evening Adhkar', category: 'spiritual' },
  { id: 'istighfar', label: 'Istighfar', category: 'spiritual' },
  { id: 'salawat', label: 'Salawat', category: 'spiritual' },
  { id: 'dailyTawbah', label: 'Daily Tawbah', category: 'spiritual' },

  // Truthfulness
  { id: 'noLieSpoken', label: 'No Lie Spoken', category: 'truthfulness' },
  { id: 'noExaggeration', label: 'No Exaggeration', category: 'truthfulness' },
  { id: 'noFalseExcuse', label: 'No False Excuse', category: 'truthfulness' },
  { id: 'honestCommunication', label: 'Honest Communication', category: 'truthfulness' },
  { id: 'keptAllPromises', label: 'Kept All Promises', category: 'truthfulness' },

  // Amanah
  { id: 'honoredAppointments', label: 'Honored Appointments', category: 'amanah' },
  { id: 'returnedBorrowedItems', label: 'Returned Borrowed Items', category: 'amanah' },
  { id: 'protectedSecrets', label: 'Protected Secrets', category: 'amanah' },
  { id: 'financialHonesty', label: 'Financial Honesty', category: 'amanah' },
  { id: 'workplaceHonesty', label: 'Workplace Honesty', category: 'amanah' },
  { id: 'businessHonesty', label: 'Business Honesty', category: 'amanah' },

  // Character
  { id: 'verifiedInfoBeforeSharing', label: 'Verified Information Before Sharing', category: 'character' },
  { id: 'noBackbiting', label: 'No Backbiting (Ghibah)', category: 'character' },
  { id: 'noGossip', label: 'No Gossip (Chughli)', category: 'character' },
  { id: 'noMocking', label: 'No Mocking Others', category: 'character' },
  { id: 'noAbusiveLanguage', label: 'No Abusive Language', category: 'character' },
  { id: 'controlledAnger', label: 'Controlled Anger', category: 'character' },
  { id: 'forgaveOthers', label: 'Forgave Others', category: 'character' },
  { id: 'showedHumility', label: 'Showed Humility', category: 'character' },

  // Family
  { id: 'parentsRespect', label: 'Parents Respect', category: 'family' },
  { id: 'parentsService', label: 'Parents Service', category: 'family' },
  { id: 'familyResponsibility', label: 'Family Responsibility', category: 'family' },
  { id: 'maintainedFamilyTies', label: 'Maintained Family Ties', category: 'family' },

  // Social Good
  { id: 'helpedSomeone', label: 'Helped Someone', category: 'socialGood' },
  { id: 'charitySadaqah', label: 'Charity / Sadaqah', category: 'socialGood' },
  { id: 'returnedGreetings', label: 'Returned Greetings', category: 'socialGood' },
  { id: 'smiledAtPeople', label: 'Smiled at People', category: 'socialGood' },

  // Self Discipline
  { id: 'loweredGaze', label: 'Lowered Gaze', category: 'selfDiscipline' },
  { id: 'avoidedHaramContent', label: 'Avoided Haram Content', category: 'selfDiscipline' },
  { id: 'timeManagement', label: 'Time Management', category: 'selfDiscipline' },
  { id: 'productiveWork', label: 'Productive Work', category: 'selfDiscipline' },
  { id: 'exercise', label: 'Exercise', category: 'selfDiscipline' },
  { id: 'healthyEating', label: 'Healthy Eating', category: 'selfDiscipline' },
  { id: 'adequateSleep', label: 'Adequate Sleep', category: 'selfDiscipline' },

  // Other
  { id: 'dailyGratitude', label: 'Daily Gratitude', category: 'socialGood' },
]

export const HABIT_IDS = HABITS.map((h) => h.id)

export function habitsByCategory(categoryKey) {
  return HABITS.filter((h) => h.category === categoryKey)
}

export function emptyHabitsObject() {
  const obj = {}
  HABIT_IDS.forEach((id) => (obj[id] = 0))
  return obj
}
