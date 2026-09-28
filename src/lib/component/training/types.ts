export interface DayCard {
  day: string;
  trainings?: Training[];
}

export interface Training {
  location: string;
  startOrder: number;
  time: string;
  title?: string;
  type: string;
  typeDescription?: string;

}