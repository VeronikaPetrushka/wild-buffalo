import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const WelcomeAbout = () => {
    const nav = useNavigation();

    return (
        <ImageBackground source={require('../asst/backs/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <Image source={require('../asst/decor/buffalo.png')} style={styles.buffalo} />

                <View style={styles.textContainer}>
                    <Text style={styles.text}>This is your space to focus, track your progress, and grow stronger — one mindful sprint at a time.</Text>
                    <Text style={[styles.text, {marginBottom: 0}]}>Set your timer, stay present, and let Buffalo guide you through focus sessions, helpful insights, and a simple game to sharpen your attention</Text>
                </View>

                <TouchableOpacity onPress={() => nav.navigate('MainMenuScreen')}>
                    <Image source={require('../asst/buttons/start.png')} style={{width: 87, height: 40, resizeMode: 'contain'}} />
                </TouchableOpacity>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 24,
        paddingBottom: height * 0.07
    },

    buffalo: {
        width: 280,
        height: 310,
        resizeMode: 'contain',
        position: 'absolute',
        top: height > 700 ? height * 0.24 : height * 0.06,
        alignSelf: 'center'
    },

    textContainer: {
        width: '100%',
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#fdfeba',
        marginBottom: 50
    },

    text: {
        fontSize: 18,
        fontWeight: '400',
        lineHeight: '120%',
        color: '#2a1d41',
        marginBottom: 20,
        textAlign: 'center'
    }

})

export default WelcomeAbout;