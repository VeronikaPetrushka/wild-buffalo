import Wrapper from "./Wrapper";
import About from "../comp/About"

const AboutScreen = () => {
    return (
        <Wrapper screen={<About />} type={'2'} />
    )
};

export default AboutScreen;