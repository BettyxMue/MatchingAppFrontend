import React from "react";
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function StartScreen () {

    const navigation = useNavigation();
    const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
      FinderHeader: {
          color: '#ffffff',
          fontSize: 36,
          marginBottom: "45%",
          alignSelf: "center"
      },
      FinderDisclaimer: {
          color: '#ffffff',
          marginBottom: "20%",
          fontSize: 12,
          textAlign: "center"
      },  
      innerView: {
          color: '#ffffff',
          alignContent: "center",
          paddingLeft: '15%',
          paddingRight: '15%'
      },
      button: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 20,
          elevation: 3,
          backgroundColor: 'transparent',
          borderColor: '#ffffff',
          marginTop: '5%',
          borderWidth: 1
      },
      buttonText: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white',
      }
  }); 
    
    return (

      <View style={{
        height: '100%',
        width: '100%',
        alignContent: "center"
    }}>
        <LinearGradient colors={['#3860ff', '#389bff']} style={styles.container}>
            <View style={styles.innerView}>
                <Text style={styles.FinderHeader}>Finder</Text>
                <Text style={styles.FinderDisclaimer}>Mit der Erstellung eines Accountes oder dem Login, bestätigen sie, dass sie mit unseren AGBs einverstanden sind!</Text>
                <View style={{alignContent: "flex-end"}}>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Registieren</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </LinearGradient>
        

    </View>
      
    )

    
    
}