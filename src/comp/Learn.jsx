import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Share, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const Learn = ({ item }) => {
    const navigation = useNavigation();

    const shareKnowledge = async () => {
        try {
            const message = `${item.title}\n\n${item.content.join('\n\n')}`;
            await Share.share({
                message,
            });
        } catch (error) {
            console.error('Error sharing content:', error);
        }
    };    

    return (
        <View style={styles.container}>

            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
                <TouchableOpacity style={[styles.back, {width: 'auto', alignItems: 'center', justifyContent: 'center'}]} onPress={() => navigation.goBack('')}>
                    <Text style={{fontSize: 18, fontWeight: '900', color: '#fff'}}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.back, {width: 'auto', alignItems: 'center', justifyContent: 'center'}]} onPress={shareKnowledge}>
                    <Text style={{fontSize: 18, fontWeight: '900', color: '#fff'}}>Share</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>{item.title}</Text>

            <ScrollView style={{width: '100%'}}>
                {
                    item.content.map((c, i) => (
                        <Text key={i} style={styles.content}>{c}</Text>
                    ))
                }
            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
        paddingTop: height * 0.1,
        backgroundColor: '#a008ab'
    },

    back: {
        width: 48,
        height: 48,
        padding: 8,
        borderWidth: 1,
        borderColor: '#fdfeba',
        borderRadius: 16,
        backgroundColor: '#a008ab',
    },

    title: {
        fontSize: 28,
        fontWeight: '500',
        lineHeight: '120%',
        color: '#fff',
        marginBottom: 12
    },

    content: {
        fontSize: 18,
        fontWeight: '400',
        lineHeight: '120%',
        color: '#fff',
        marginBottom: 10
    }

})

export default Learn;