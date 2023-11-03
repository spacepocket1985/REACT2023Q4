import { Link } from 'react-router-dom';

import { IErrorMsgProps } from '../../interfaces/IErrorMsgProps';
import errorImg from './error.gif';
import './ErrorMessage.css';

const ErrorMessage = (props: IErrorMsgProps) => {
  return (
    <>
      <h2 className="errorTitle">We have some error here! </h2>
      <img className="errorImg" src={errorImg} alt="Error" />;
      <p className="errorInfo">{props.errorMsg}</p>
      <Link className="link-home" to="/">
        Back to Main page
      </Link>
    </>
  );
};

export default ErrorMessage;
