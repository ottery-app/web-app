export interface StepProps<T> {
  form: T;
  setForm: React.Dispatch<React.SetStateAction<T>>;
  setErrorHandler: React.Dispatch<React.SetStateAction<() => void>>;
}

export interface MultiStepFormProps<T> {
  submit: (form: T) => void;
  form: T;
  setForm: React.Dispatch<React.SetStateAction<T>>;
  steps: React.JSXElementConstructor<StepProps<T>>[];
  error: any;
  handleError: (err: any) => void;
}
