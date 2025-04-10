import { ImageBackground } from "react-native"

const Wrapper = ({ screen, type }) => {
    const image = type === '1' ? require('../asst/backs/1.png') : require('../asst/backs/2.png');

    return (
        <ImageBackground source={image} style={{ flex: 1 }}>
            {screen}
        </ImageBackground>
    )
};

export default Wrapper;