import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, TextInput, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Circle } from 'react-native-progress';

const { height } = Dimensions.get('window');

const Timer = () => {
    const navigation = useNavigation();
    const [start, setStart] = useState(false);
    const [finish, setFinish] = useState(false);
    const [task, setTask] = useState(null);
    const [pause, setPause] = useState(false);
    const [duration, setDuration] = useState(60 * 60);
    const [timeLeft, setTimeLeft] = useState(duration);
    
    const intervalRef = useRef(null);

    useEffect(() => {
        setTimeLeft(duration);
    }, [duration]);

    useEffect(() => {
        if (start && !pause && !finish) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        setFinish(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [start, pause, finish]);

    const togglePause = () => {
        setPause(prev => !prev);
    };

    const resetTimer = () => {
        setStart(false);
        setPause(false);
        setFinish(false);
        setTask('');
        setTimeLeft(duration);
    };

    const startTimer = async () => {
        if (!task.trim()) return;

        const timerEntry = {
            task,
            duration,
            date: Date.now(),
        };

        const existing = await AsyncStorage.getItem('timers');
        const timers = existing ? JSON.parse(existing) : [];
        timers.push(timerEntry);
        await AsyncStorage.setItem('timers', JSON.stringify(timers));

        setStart(true);
    };

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60).toString().padStart(2, '0');
        const sec = (seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    const progress = timeLeft / duration;

    return (
        <View style={styles.container}>

            <TouchableOpacity style={[styles.back, {width: 'auto', alignItems: 'center', justifyContent: 'center'}]} onPress={() => navigation.goBack('')}>
                <Text style={{fontSize: 18, fontWeight: '900', color: '#fff'}}>Menu</Text>
            </TouchableOpacity>

            <ScrollView style={{width: '100%'}}>
                {
                    (!start && !finish) && (
                        <View style={styles.toggleTimerContainer}>
                            <TouchableOpacity 
                                style={[styles.toggleButton, duration === 60*40 && {backgroundColor: '#a008ab'}]} 
                                onPress={() => setDuration(60*40)}
                                >
                                <Text style={[styles.toggleButtonText, duration === 60*40 && {color: '#fff'}]}>40 min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.toggleButton, duration === 60*60 && {backgroundColor: '#a008ab'}]}  
                                onPress={() => setDuration(60*60)}
                                >
                                <Text style={[styles.toggleButtonText, duration === 60*60 && {color: '#fff'}]}>60 min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.toggleButton, duration === 60*90 && {backgroundColor: '#a008ab'}]}  
                                onPress={() => setDuration(60*90)}
                                >
                                <Text style={[styles.toggleButtonText, duration === 60*90 && {color: '#fff'}]}>90 min</Text>
                            </TouchableOpacity>
                        </View>    
                    )
                }

                {
                    start && <View style={{height: 70}} />
                }

                <View style={{ marginBottom: height * 0.07, alignItems: 'center' }}>
                    <Circle
                        size={height * 0.3}
                        progress={progress}
                        thickness={10}
                        color="#fdfeba"
                        borderWidth={0}
                        showsText={false}
                    />
                        <View style={{ position: 'absolute', top: height * 0.035, alignItems: 'center', justifyContent: 'center', backgroundColor: '#a008ab', width: height * 0.23, height: height * 0.23, borderRadius: 300 }}>
                            <Text style={{ fontSize: 32, fontWeight: '900', color: '#fff' }}>{formatTime(timeLeft)}</Text>
                        </View>
                </View>

                {
                    !start && (
                        <View style={{width: '100%'}}>
                            <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 24}}>
                                <TouchableOpacity 
                                    style={[styles.amountButton, {alignItems: 'center', justifyContent: 'center'}]} 
                                    onPress={() => setDuration(prev => prev - 60)}
                                    disabled={duration <= 60}
                                    >
                                    <Text style={{fontSize: 24, fontWeight: '900', color: '#a008ab'}}>-</Text>
                                </TouchableOpacity>
                                <TextInput
                                        style={styles.input}
                                        value={task}
                                        onChangeText={setTask}
                                        placeholder='Task name'
                                        placeholderTextColor={'rgba(42, 29, 65, 0.4)'}
                                    />
                                <TouchableOpacity 
                                    style={[styles.amountButton, {alignItems: 'center', justifyContent: 'center'}]} 
                                    onPress={() => setDuration(prev => prev + 60)}
                                    >
                                    <Text style={{fontSize: 24, fontWeight: '900', color: '#a008ab'}}>+</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                                <TouchableOpacity style={[styles.actionButton, {width: 'auto', alignItems: 'center', justifyContent: 'center'}]} onPress={startTimer}>
                                <Text style={{fontSize: 18, fontWeight: '900', color: '#fff'}}>Start</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionButton, {width: 'auto', alignItems: 'center', justifyContent: 'center'}]} onPress={resetTimer}>
                                <Text style={{fontSize: 18, fontWeight: '900', color: '#fff'}}>Reset</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }

                {start && !finish && (
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30}}>
                        <TouchableOpacity onPress={resetTimer}>
                            <Image source={require('../asst/buttons/reset.png')} style={{width: 101, height: 40, resizeMode: 'contain'}} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={togglePause}>
                            {
                                pause ? (
                                    <Image source={require('../asst/buttons/continue.png')} style={{width: 155, height: 40, resizeMode: 'contain'}} />
                                ) : (
                                    <Image source={require('../asst/buttons/pause.png')} style={{width: 101, height: 40, resizeMode: 'contain'}} />
                                )
                            }
                        </TouchableOpacity>
                    </View>
                )}

                {
                    finish && (
                        <View style={{width: '100%', position: 'absolute', top: height * 0.29, alignItems: 'center'}}>
                            <View style={[styles.textContainer, {marginBottom: height > 700 ? height * 0.03 : 0}]}>
                                <Text style={[styles.text, {fontSize: height > 700 ? 18 : 14}]}>Well done. You stayed present, step by step. Take a breath, stretch a little, and let the stillness guide your next move</Text>
                            </View>
                            <Image source={require('../asst/decor/buffalo.png')} style={[styles.buffalo, {height: height * 0.22}]} />
                            <View style={[styles.taskContainer, {marginBottom: height * 0.03, marginTop: -10}]}>
                                <Text style={styles.task}>{task}</Text>
                            </View>
                            <TouchableOpacity onPress={resetTimer}>
                                <Image source={require('../asst/buttons/home.png')} style={{width: 100, height: 40, resizeMode: 'contain'}} />
                            </TouchableOpacity>

                            <View style={{height: 100}} />
                        </View>
                    )
                }

                {
                    (start && !finish) && (
                        <View style={[styles.taskContainer, {position: 'absolute', bottom: height * 0.14}]}>
                            <Text style={styles.task}>{task}</Text>
                        </View>
                    )
                }

                {
                    (!start && !finish) && (
                        <TouchableOpacity 
                            style={[styles.taskContainer, {position: 'absolute', bottom: height * 0.14}]}
                            onPress={() => navigation.navigate('HistoryScreen')}
                            >
                            <Text style={styles.task}>History</Text>
                        </TouchableOpacity>
                    )
                }

                <View style={{height: 300}} />
            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
        paddingTop: height * 0.16,
        paddingBottom: 0
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

    toggleTimerContainer: {
        width: '100%',
        height: 47,
        backgroundColor: '#fdfeba',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 24
    },

    toggleButton: {
        width: '33.3%',
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },

    toggleButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        lineHeight: '120%'
    },

    amountButton: {
        width: 48,
        height: 48,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 16,
    },

    input: {
        width: 225,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 20,
        color: '#2a1d41',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: '120%',
        backgroundColor: '#fdfeba'
    },

    actionButton: {
        width: 48,
        height: 48,
        padding: 12,
        borderWidth: 1,
        borderColor: '#fdfeba',
        borderRadius: 16,
        backgroundColor: '#a008ab',
    },

    taskContainer: {
        width: '100%',
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#fdfeba',
        alignItems: 'center',
        justifyContent: 'center',
    },

    task: {
        color: '#2a1d41',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: '120%',
    },

    buffalo: {
        width: 197,
        height: 215,
        resizeMode: 'contain',
        marginTop: height > 700 ? -40 : -20
    },

    textContainer: {
        width: '100%',
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#fdfeba',
    },

    text: {
        fontSize: 18,
        fontWeight: '400',
        lineHeight: '120%',
        color: '#2a1d41',
        textAlign: 'center'
    }

})

export default Timer;