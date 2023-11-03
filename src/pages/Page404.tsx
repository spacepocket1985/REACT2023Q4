import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className="wrapper-404">
      <h1>404 - Not Found</h1>
      <Link className="link-home" to="/">
        Back to Main page
      </Link>
    </div>
  );
};

export default Page404;
