import Wrapper from "./Wrapper";
import Timer from "../comp/Timer"

const TimerScreen = () => {
    return (
        <Wrapper screen={<Timer />} type={'2'} />
    )
};

export default TimerScreen;