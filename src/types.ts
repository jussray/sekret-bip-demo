export type ScreenId =
  | 'chooser'
  | 'room'
  | 'chat'
  | 'journal'
  | 'calm'
  | 'voice'
  | 'circles'
  | 'comfort'
  | 'points'
  | 'parent';

export interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  moodColor: string;
  text: string;
  tags: string[];
}

export interface ComfortQuote {
  q: string;
  src: string;
}
