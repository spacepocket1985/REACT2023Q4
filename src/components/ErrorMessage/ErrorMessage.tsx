import { Component } from 'react';
import { IErrorMsgProps } from '../../interfaces/IErrorMsgProps';
import errorImg from './error.gif';
import './ErrorMessage.css';

class ErrorMessage extends Component<IErrorMsgProps> {
  constructor(props: IErrorMsgProps) {
    super(props);
  }

  render() {
    return (
      <>
        <h2 className="errorTitle">We have some error here! </h2>
        <img className="errorImg" src={errorImg} alt="Error" />;
        <p className="errorInfo">{this.props.errorMsg}</p>
      </>
    );
  }
}

export default ErrorMessage;
