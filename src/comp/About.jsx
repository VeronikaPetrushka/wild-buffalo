import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native"
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const About = () => {
    const nav = useNavigation();

    return (
        <View style={styles.container}>

            <TouchableOpacity style={[styles.back, {width: 'auto', alignItems: 'center', justifyContent: 'center'}]} onPress={() => nav.goBack('')}>
                <Text style={{fontSize: 18, fontWeight: '900', color: '#fff'}}>Back</Text>
            </TouchableOpacity>

            <Image source={require('../asst/titles/about.png')} style={{width: 104, height: 40, resizeMode: 'contain', marginBottom: 30}} />

            <Image source={require('../asst/decor/buffalo.png')} style={styles.buffalo} />

            <View style={styles.textContainer}>
                <Text style={styles.text}>Focus Game: Buffalo’s Sprint is your companion on the journey to better concentration and time mastery. Sprint with Buffalo. Track your growth. Stay mindful. Focus stronger.</Text>
                <Text style={[styles.text, {marginBottom: 0}]}>Created with love for focused minds.</Text>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 24,
        paddingTop: height * 0.1
    },

    back: {
        width: 48,
        height: 48,
        padding: 8,
        borderWidth: 1,
        borderColor: '#fdfeba',
        borderRadius: 16,
        backgroundColor: '#a008ab',
        position: 'absolute',
        top: height * 0.093,
        left: 24
    },

    buffalo: {
        width: 280,
        height: 310,
        resizeMode: 'contain',
    },

    textContainer: {
        width: '100%',
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#fdfeba',
        marginTop: -10
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

export default About;