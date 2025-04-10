import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from '../const/colors';

const { height } = Dimensions.get('window');

const Colors = () => {
    const nav = useNavigation();
    const [start, setStart] = useState(false);
    const [finish, setFinish] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(null);
    const [correct, setCorrect] = useState(0);
    const [timer, setTimer] = useState(60);
    const [pause, setPause] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        let timer;
        if (start && !finish && !pause) {
            timer = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setTimeout(() => setFinish(true), 1000)
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    
        return () => clearInterval(timer);
    }, [start, finish, pause]);    

    const selectOption = (color) => {
        setSelectedColor(color);

        if(color) {
            if(color === colors[currentQuestionIndex].correct) {
                setCorrect((prev) => prev + 1);
            } else {
                setTimeout(() => setFinish(true), 1000)
            }
        }

        if(currentQuestionIndex === colors.length - 1) {
            setTimeout(() => setFinish(true), 1000)
        } else {
            setTimeout(() => setCurrentQuestionIndex((prev) => prev + 1), 1000)
        }
    };

    const togglePause = () => {
        if(pause) {
            setPause(false);
            setModalVisible(false)    
        } else {
            setPause(true);
            setModalVisible(true)    
        }
    };

    const handleToStart = () => {
        setFinish(false);
        setStart(false);
        setSelectedColor(null);
        setCurrentQuestionIndex(0);
        setCorrect(0);
        setTimer(60);
        setPause(false);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>

            {
                (!start && !finish) && (
                    <TouchableOpacity style={[styles.back, {width: 'auto', alignItems: 'center', justifyContent: 'center'}]} onPress={() => nav.goBack('')}>
                        <Text style={{fontSize: 18, fontWeight: '900', color: '#fff'}}>Menu</Text>
                    </TouchableOpacity>
                )
            }

            {
                (!start && !finish) && (
                    <Image source={require('../asst/titles/tap.png')} style={{width: 336, height: 40, resizeMode: 'contain', marginBottom: 30}} />
                )
            }

            {
                (start && !finish) && (
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30, marginTop: height * -0.07}}>
                        <TouchableOpacity style={[styles.pauseButton, {width: 'auto', alignItems: 'center', justifyContent: 'center'}]} onPress={togglePause}>
                            <Text style={{fontSize: 18, fontWeight: '900', color: '#fff'}}>Pause</Text>
                        </TouchableOpacity>
                        <Text style={styles.timer}>{String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</Text>
                    </View>
                )
            }

            {
                finish && (
                    <View style={{height: 70}} />
                )
            }

            <Image source={require('../asst/decor/buffalo.png')} style={styles.buffalo} />

            {
                start ? (
                    <View style={{width: '100%', alignItems: 'center', flexGrow: 1}}>
                        {
                            finish ? (
                                <View style={{width: '100%', alignItems: 'center', flexGrow: 1}}>
                                    <View style={styles.textContainer}>
                                        <Text style={[styles.text, {fontWeight: '600', fontSize: 20}]}>Sprint Complete!</Text>
                                        <Text style={styles.text}>Your attention is your true power</Text>
                                        <Text style={[styles.text, {fontWeight: '600'}]}>Final Score: {correct}</Text>
                                    </View>
                                    <TouchableOpacity onPress={handleToStart}>
                                        <Image source={require('../asst/titles/home.png')} style={{width: 100, height: 40, resizeMode: 'contain'}} />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={{width: '100%', alignItems: 'center', flexGrow: 1}}>
                                    <View style={[styles.mainColor, {backgroundColor: colors[currentQuestionIndex].correct}]} />
                                    {selectedColor === colors[currentQuestionIndex].correct && <Text style={styles.correctText}>+ 1</Text>}
                                    <View style={styles.colorsContainer}>
                                        {
                                            colors[currentQuestionIndex].options.map((option, index) => (
                                                <TouchableOpacity 
                                                    key={index} 
                                                    style={[styles.colorButton, {backgroundColor: option}]} 
                                                    onPress={() => selectOption(option)}
                                                    >
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View>
                                </View>
                            )
                        }
                    </View>
                ) : (
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Sharpen your attention by tapping only the buttons that match the target color. Stay focused — distractions will test your mind!</Text>
                        </View>

                        <TouchableOpacity onPress={() => setStart(true)}>
                            <Image source={require('../asst/buttons/start.png')} style={{width: 87, height: 40, resizeMode: 'contain'}} />
                        </TouchableOpacity>
                    </View>
                )
            }

            <Modal 
                visible={modalVisible} 
                transparent={true}
                animationType="fade"
                onRequestClose={togglePause}
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Game Paused</Text>
                        <Text style={styles.modalText}>Even quick breaks help your focus grow stronger</Text>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <TouchableOpacity style={[styles.modalButton, {borderRightWidth: 0.3, borderRightColor: '#3c3c3c'}]} onPress={handleToStart}>
                                <Text style={styles.modalLeave}>Leave</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={togglePause}>
                                <Text style={styles.modalResume}>Resume</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

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

    pauseButton: {
        width: 48,
        height: 48,
        padding: 8,
        borderWidth: 1,
        borderColor: '#fdfeba',
        borderRadius: 16,
        backgroundColor: '#a008ab',
    },

    timer: {
        fontSize: 32,
        fontWeight: '900',
        lineHeight: '120%',
        color: '#fff',
    },

    buffalo: {
        width: 280,
        height: height * 0.31,
        resizeMode: 'contain',
    },

    textContainer: {
        width: '100%',
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#fdfeba',
        marginTop: -10,
        marginBottom: height * 0.05
    },

    text: {
        fontSize: 18,
        fontWeight: '400',
        lineHeight: '120%',
        color: '#2a1d41',
        textAlign: 'center'
    },

    correctText: {
        fontSize: 32,
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: height * 0.2,
        alignSelf: 'center'
    },

    mainColor: {
        width: '100%',
        height: 108,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fdfeba',
    },

    colorsContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'absolute',
        bottom: height * 0.1,
        alignSelf: 'center'
    },

    colorButton: {
        width: 60,
        height: 60,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#fdfeba',
    },

    modalContainer: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)' 
    },

    modalContent: {
        width: 273,
        backgroundColor: 'rgba(242, 242, 242, 0.8)',
        borderRadius: 12,
        alignItems: 'center'
    },

    modalTitle: { 
        color: '#000', 
        fontSize: 17, 
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 3,
        marginTop: 15
    },
    
    modalText: { 
        color: '#000', 
        fontSize: 13, 
        fontWeight: '400',
        lineHeight: 18,
        textAlign: 'center',
        width: '85%',
        marginBottom: 16
    },
    
    modalButton: { 
        width: '50%',
        paddingVertical: 11, 
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 0.3,
        borderColor: '#3c3c3c' 
    },
    
    modalResume: { 
        color: '#a008ab', 
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 22
    },

    modalLeave: {
        color: '#000', 
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 22 
    }

})

export default Colors;