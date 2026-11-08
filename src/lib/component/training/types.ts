export interface DayCard {
  day: string;
  trainings?: Training[];
  notices?: any[];
}

export interface NoticeRawData {
  data: {
    isCancelled?: {iv: boolean};
    newLocation?: { iv: string };
    newStartTime?: { iv: string };
    newEndTime?: { iv: string };
    text?: { iv: string };
    trainings?: { iv: string[] };
    validFrom?: { iv: string };
    validUntil?: { iv: string };
  };
}

export interface LocationRawData {
  id: string;
  data: {
    name?: { iv: string };
  };
}

export interface Training {
  date?: Date;
  id: string;
  isCancelled?: boolean;
  isChanged?: boolean;
  location: string;
  startOrder: number;
  time: string;
  title?: string;
  type: string;
  typeDescription?: string;
}

export interface TrainingRawData {
  data: {
    repeatsOn?: { iv: string };
    date?: { iv: string };
    location?: { iv: string };
    type?: { iv: string };
    startTime?: { iv: string };
    endTime?: { iv: string };
    title?: { iv: string };
  };
  id: string;
}

export interface TypeRawData {
  data: {
    title?: { en: string };
    description?: { en: string };
  };
  id: string;
}