import { StyleSheet } from "react-native";

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
    },
    registerInputField: {
        justifyContent: "center",
        height: "100%"
    },
    registerBackground: {
        height: "50%",
        width: "70%",
        padding: "10%",
        borderRadius: 40,
        alignContent: "center",
        backgroundColor: 'white',
        marginRight: "15%",
        marginLeft: "15%",
    },
    registerTitle:{
        fontWeight: "bold",
        alignSelf: "center"
    },
    registerInputTextInput: {
        height: 40,
        padding: 10,
        backgroundColor: "#edebeb",
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    continueButton: {
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        height: "10%",
        width: "100%",
        borderRadius: 10,
        backgroundColor: "#78ed6f",
        padding:5
    },
    continueButtonText: {
        fontWeight: "bold",
        color: "white"

    }
}); 

export {styles}