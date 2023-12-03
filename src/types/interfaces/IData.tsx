interface IFormData {
  name: string;
  age: number;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  country: string;
  picture: string | FileList;
}

export default IFormData;
