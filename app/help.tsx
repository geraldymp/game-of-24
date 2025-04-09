import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const GameRulesScreen = ({ navigation }: { navigation: any }) => {

    const router = useRouter();
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Game Rules</Text>
            <Text style={styles.rule}>1. Your goal is making number 24.</Text>
            <Text style={styles.rule}>
                2. You will be given a set of 4 numbers, which you can add, subtract, multiply, and divide between those numbers.
            </Text>
            <Text style={styles.rule}>
                3. You can deselect a selected card before you make any calculation with it.
            </Text>
            <Text style={styles.rule}>4. Press 'Restart Game' if you finish the game.</Text>

            <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                <Text style={styles.buttonText}>Back to Game</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    rule: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
    },
    button: {
        marginTop: 30,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GameRulesScreen;