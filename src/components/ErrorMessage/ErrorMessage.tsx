import { IErrorMsgProps } from "../../types/interfaces/IErrorMsgProps";
import errorImg from "../../../public/error.gif";

const ErrorMessage = (props: IErrorMsgProps) => {
  return (
    <>
      <h2 className="errorTitle">We have some error here! </h2>
      <img className="errorImg" src={errorImg} alt="Error" />;
      <p className="errorInfo">{props.errorMsg}</p>
    </>
  );
};

export default ErrorMessage;
