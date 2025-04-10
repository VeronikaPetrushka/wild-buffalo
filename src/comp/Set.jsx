import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Switch, Image, Share, Linking, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const SettingItem = ({ label, value, onToggle }) => (
    <View style={styles.button}>
        <Text style={styles.buttonText}>{label}</Text>
        <Switch
            value={value}
            onValueChange={onToggle}
            thumbColor="#fff"
            trackColor={{ false: "#ccc", true: "#a008ab" }}
        />
    </View>
);

const SettingLink = ({ label, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
);

const Set = () => {
    const nav = useNavigation();
    const [vibration, setVibration] = useState(true);
    const [notifications, setNotifications] = useState(false);

    const handleToggleVibration = () => setVibration(prev => !prev);
    const handleToggleNotifications = () => setNotifications(prev => !prev);

    const handleShareApp = async () => {
        try {
            const result = await Share.share({
                title: "Focus Game: Buffalo's Sprint",
                message: "https://apps.apple.com/us/app/focus-game-buffalos-sprint/id6744101446",
            });

            if (result.action === Share.sharedAction) {
                alert(result.activityType ? `Shared via ${result.activityType}` : "App link shared successfully");
            } else if (result.action === Share.dismissedAction) {
                alert("Share action dismissed");
            }
        } catch (e) {
            alert("Error sharing app link, try again later...");
        }
    };

    const handleOpenTerms = () => {
        Linking.openURL('https://www.termsfeed.com/live/a9b140aa-4230-4b63-b4d7-6328ba23063d').catch(() =>
            alert("Error", "Unable to open Terms of Use")
        );
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={[styles.back, {width: 'auto', alignItems: 'center', justifyContent: 'center'}]} onPress={() => nav.goBack('')}>
                <Text style={{fontSize: 18, fontWeight: '900', color: '#fff'}}>Menu</Text>
            </TouchableOpacity>

            <Image source={require('../asst/titles/settings.png')} style={styles.title} />

            <ScrollView style={{ width: '100%' }}>

                <SettingItem label="Vibration" value={vibration} onToggle={handleToggleVibration} />
                <SettingItem label="Notifications" value={notifications} onToggle={handleToggleNotifications} />

                <SettingLink label="About the app" onPress={() => nav.navigate('AboutScreen')} />
                <SettingLink label="Share the app" onPress={handleShareApp} />
                <SettingLink label="Terms of use" onPress={handleOpenTerms} />

                <View style={{ height: 100 }} />
            </ScrollView>

        </View>
    );
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

    title: {
        width: 140,
        height: 40,
        resizeMode: 'contain',
        marginBottom: 30
    },

    button: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderRadius: 16,
        backgroundColor: '#fdfeba',
        marginBottom: 16
    },

    buttonText: {
        fontWeight: '400',
        fontSize: 16,
        color: '#2a1d41',
    }

});

export default Set;