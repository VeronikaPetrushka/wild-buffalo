import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import knowledge from "../const/knowledge.js";

const { height } = Dimensions.get('window');

const Knowledge = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <TouchableOpacity style={[styles.back, {width: 'auto', alignItems: 'center', justifyContent: 'center'}]} onPress={() => navigation.goBack('')}>
                <Text style={{fontSize: 18, fontWeight: '900', color: '#fff'}}>Menu</Text>
            </TouchableOpacity>

            <Image source={require('../asst/titles/knowledge.png')} style={{width: 285, height: 40, resizeMode: 'contain', marginBottom: 30}} />

            <ScrollView contentContainerStyle={{width: '100%', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    knowledge.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.button} onPress={() => navigation.navigate('LearnScreen', { item })}>
                            <Text style={styles.buttonText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))
                }
                <View style={{height: 120}} />
            </ScrollView>
        
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
        paddingTop: height * 0.15
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
        top: height * 0.08,
        left: 24
    },

    button: {
        width: '47%',
        height: 190,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fdfeba',
        marginBottom: 24,
        backgroundColor: '#a008ab',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 16
    },

    buttonText: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: '120%',
        color: '#fff'
    }

})

export default Knowledge;