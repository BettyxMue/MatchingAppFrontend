// @ts-nocheck
import React from "react";
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../resources/Styles'
import {Ionicons} from "@expo/vector-icons";

const StartScreen = ({navigation}) => {
    return (
      <View style={{
        height: '100%',
        width: '100%',
        alignContent: "center"
    }}>
        <LinearGradient colors={['#3860ff', '#389bff']} style={styles.container}>
            <View style={styles.innerView}>
            <Ionicons name="search-circle" size={100} color="white" style={{
                        paddingLeft: "29%",
                        paddingBottom: "10%"
                    }}/>
                <Text style={styles.FinderHeader}>Finder</Text>
                <Text style={styles.FinderDisclaimer} onPress={() => navigation.navigate("AGBs")} >Mit der Erstellung eines Accountes oder dem Login, bestätigen sie, dass sie mit unseren AGBs einverstanden sind!</Text>
                <View style={{alignContent: "flex-end"}}>
                    <TouchableOpacity style={styles.button} onPress={() => 
                      navigation.navigate('Registierung')}>
                        <Text style={styles.buttonText}>Registieren</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.navigate('LogIn')
                    }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
        

    </View>
      
    );

    
    
};

export default StartScreen