import Wrapper from "./Wrapper";
import MainMenu from "../comp/MainMenu"

const MainMenuScreen = () => {
    return (
        <Wrapper screen={<MainMenu />} type={'1'} />
    )
};

export default MainMenuScreen;