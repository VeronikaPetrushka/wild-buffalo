import Wrapper from "./Wrapper";
import WelcomeAbout from "../comp/WelcomeAbout"

const WelcomeAboutScreen = () => {
    return (
        <Wrapper screen={<WelcomeAbout />} type={'1'} />
    )
};

export default WelcomeAboutScreen;