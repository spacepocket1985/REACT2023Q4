interface IForm {
  name: string;
  age: number;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  country: string;
  picture: FileList;
}

export default IForm;
