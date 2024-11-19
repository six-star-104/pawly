export interface IChallenges {
  id: number;
  title: string;
  reward: string;
  status: string;
}[]

export interface EasterEggData {
  easterEggId: number;
  content: string;
  reward: string | null;
  status: string;
  completedAt: string | null;
}

export interface EasterEggResponse {
  status: string;
  data: {
    easterEggId: number;
    content: string;
    reward: string | null;
    status: string;
    completedAt: string | null;
  }[];
  code: string | null;
  message: string;
}