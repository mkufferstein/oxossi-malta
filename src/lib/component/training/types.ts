export interface DayCard {
  day: string;
  trainings?: Training[];
  notices?: any[];
}

export interface DayRawData {
  id: string;
  data: {
    name?: { [key: string]: string };
    order?: { iv: Number };
  };
}

export interface LocationRawData {
  id: string;
  data: {
    name?: { iv: string };
  };
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

export interface Training {
  date?: Date;
  id: string;
  isCancelled?: boolean;
  isChanged?: boolean;
  location: {data : any};
  startOrder: number;
  time: string;
  title?: string;
  type: string;
  typeDescription?: string;
}

export interface TrainingRawData {
  data: {
    repeatsOn?: { iv: string[] };
    date?: { iv: string };
    location?: { iv: string[] };
    type?: { iv: string[] };
    startTime?: { [key: string]: string };
    endTime?: { [key: string]: string };
    title?: { [key: string]: string };
  };
  id: string;
}

export interface TypeRawData {
  data: {
    title?: { [key: string]: string };
    description?: { [key: string]: string };
  };
  id: string;
}