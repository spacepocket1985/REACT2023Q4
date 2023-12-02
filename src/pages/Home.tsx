import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import IFormData from '../types/interfaces/IData';
import { ReactNode } from 'react';

const Home = () => {
  const dataFromForms = useSelector((state: RootState) => {
    return state.dataFromForms.dataFromForms;
  });

  const renderData = (data: IFormData[]): ReactNode => {
    return data.map((item, index) => {
      const { name, email, country, gender, age, password, picture } = item;
      return (
        <div className="wrapper-data" key={index}>
          <img src={String(picture)} alt="picture" />
          <h2 className="form-title">{`Form № -  ${index + 1}`}</h2>
          <div className="form-pic"></div>
          <div className="data-line">
            <div className="line-title">Name</div>
            <div className="line-value">{name}</div>
            <div className="data-line">
              <div className="line-title">Gender</div>
              <div className="line-value">{gender}</div>
            </div>
            <div className="data-line">
              <div className="line-title">Age</div>
              <div className="line-value">{age}</div>
            </div>
          </div>
          <div className="data-line">
            <div className="line-title">Country</div>
            <div className="line-value">{country}</div>
          </div>
          <div className="data-line">
            <div className="line-title">Email</div>
            <div className="line-value">{email}</div>
          </div>
          <div className="data-line">
            <div className="line-title">Password</div>
            <div className="line-value">{password}</div>
          </div>

          <div></div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="wrapper-home">
        {dataFromForms.length > 0 ? renderData(dataFromForms) : <h1>no data</h1>}
      </div>
    </>
  );
};

export default Home;
