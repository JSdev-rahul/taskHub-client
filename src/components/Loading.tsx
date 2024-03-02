import ReactLoading from "react-loading";

const Loading = ({}) => {
  return (
    <div className="flex justify-center h-screen items-center">
      <ReactLoading type={"spin"} color={"red"} height={100} width={100} />
    </div>
  );
};

export default Loading;
