import Wrapper from "./Wrapper";
import Loader from "../comp/Loader"

const LoaderScreen = () => {
    return (
        <Wrapper screen={<Loader />} type={'1'} />
    )
};

export default LoaderScreen;