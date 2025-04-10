import { TouchableOpacity, StyleSheet, View, Dimensions, Text, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Nav = () => {
    const nav = useNavigation();

    return (
        <View style={styles.container}>

            <Image source={require('../asst/decor/buffalo.png')} style={styles.buffalo} />

            <TouchableOpacity 
                style={[styles.button, {marginTop: -2}]} 
                onPress={() => nav.navigate('TimerScreen')}>
                    <Text style={styles.buttonText}>Timer</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => nav.navigate('KnowledgeScreen')}>
                <Text style={styles.buttonText}>Knowledge Zone</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => nav.navigate('ColorsScreen')}>
                <Text style={styles.buttonText}>Game</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => nav.navigate('SetScreen')}>
                <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        padding: 24,
        paddingTop: height * 0.1
    },

    buffalo: {
        width: 280,
        height: height * 0.3,
        resizeMode: 'contain',
    },
    
    button: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#fdfeba',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        backgroundColor: 'rgba(160, 8, 171, 0.5)'
    },

    buttonText: {
        fontSize: 28,
        fontWeight: '900',
        color: '#fdfeba',
        lineHeight: '120%'
    }

});

export default Nav;
