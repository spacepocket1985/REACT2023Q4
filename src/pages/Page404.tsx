import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const Page404 = () => {
  return (
    <div className="wrapper-404">
      <h1>404 - Not Found</h1>
      <ErrorMessage errorMsg={'The requested page not found!'} />
    </div>
  );
};

export default Page404;
