import errorImg from './error.gif';
import './ErrorMessage.css';

const ErrorMessage = (): JSX.Element => {
  return (
    <>
      <h2 className="errorTitle">Oops we have some ERROR here...</h2>
      <img className="errorImg" src={errorImg} alt="Error" />;
    </>
  );
};

export default ErrorMessage;
