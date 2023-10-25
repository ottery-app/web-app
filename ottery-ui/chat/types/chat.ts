export interface Message {
  date: number;
  message: string;
  sender: string;
}

export interface Chat {
  _id: string;
  name: string;
  users: string[];
  messages: Message[];
  __v: number;
}

export enum DateFormat {
  date = "date",
  time = "time",
  md = "month-day",
}
