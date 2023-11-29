export interface EventFormProps {
  summary: string;
  org: string;
  description: string;
  start: number;
  end: number;
  location: string;
  recurrence: string[];
  volunteerSignUp: string[];
  attendeeSignUp: string[];
  cost: number;
  public: boolean;
}
