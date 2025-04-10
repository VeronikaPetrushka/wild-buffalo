import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, Modal } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const History = () => {
    const navigation = useNavigation();
    const [tasks, setTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );

    const formatDate = (taskDate) => {
        const date = new Date(taskDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };
    
    const fetchTasks = async () => {
        try {
            const data = await AsyncStorage.getItem('timers');
            if (data) {
                const parsed = JSON.parse(data);
                setTasks(parsed.reverse());
            }
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };

    const deleteTask = async (task) => {
        try {
            const updated = tasks.filter(t => t.date !== task.date);
            setTasks(updated);
            await AsyncStorage.setItem('timers', JSON.stringify(updated));

            setModalVisible(false);

        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={[styles.back, {width: 'auto', alignItems: 'center', justifyContent: 'center'}]} onPress={() => navigation.goBack('')}>
                <Text style={{fontSize: 18, fontWeight: '900', color: '#fff'}}>Back</Text>
            </TouchableOpacity>

            <Image source={require('../asst/titles/history.png')} style={{width: 232, height: 80, resizeMode: 'contain', marginBottom: 30}} />

            {
                tasks.length > 0 ? (
                    <ScrollView style={{width: '100%'}}>
                        {
                            tasks.map((task, index) => (
                                <TouchableOpacity 
                                    key={index} 
                                    style={styles.taskContainer}
                                    onPress={() => setModalVisible(true)}
                                    >
                                        <View>
                                            <Text style={styles.task}>{task.task}</Text>
                                            <Text style={[styles.task, {fontWeight: '300', fontSize: 12}]}>{formatDate(task.date)}</Text>
                                        </View>
                                        <Text style={[styles.task, {fontWeight: '600', fontSize: 18}]}>{Math.floor(task.duration / 60)} min</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                ) : (
                    <View style={styles.taskContainer}>
                        <Text style={styles.task}>Your history is empty... You don`t have any tasks yet.</Text>
                    </View>
                )
            }

            <Modal 
                visible={modalVisible} 
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Are you sure you want to delete this sprint?</Text>
                        <Text style={styles.modalText}>This action can’t be undone</Text>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <TouchableOpacity style={[styles.modalButton, {borderRightWidth: 0.3, borderRightColor: '#3c3c3c'}]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalClose}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={deleteTask}>
                                <Text style={styles.modalDelete}>Delete</Text>
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

    taskContainer: {
        width: '100%',
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#fdfeba',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 12
    },

    task: {
        color: '#2a1d41',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: '120%',
    },

    modalContainer: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)' 
    },

    modalContent: {
        width: 280,
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
    
    modalDelete: { 
        color: '#ff3b30', 
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 22
    },

    modalClose: {
        color: '#000', 
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 22 
    }

})

export default History;