// @ts-nocheck
import {StyleSheet} from "react-native";

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
        height: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    registerBackground: {
        marginTop: "45%",
        marginBottom: "25%",
        width: "75%",
        padding: "10%",
        borderRadius: 40,
        alignContent: "center",
        backgroundColor: 'white',
        marginRight: "15%",
        marginLeft: "15%"
    },
    registerTitle: {
        fontWeight: "bold",
        alignSelf: "center",
        textAlign: "center",
        fontSize: 16
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
        //height: "15%",
        width: "100%",
        borderRadius: 10,
        backgroundColor: "#78ed6f",
        padding: 5,
        marginTop: "5%"
    },
    continueButtonDeactivated: {
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        //height: "15%",
        width: "100%",
        borderRadius: 10,
        backgroundColor: "#87888a",
        padding: 5,
        marginTop: "5%"
    },
    continueButtonText: {
        fontWeight: "bold",
        color: "white"

    },
    chatPicture: {
        borderRadius: "100%",
        width: 50,
        height: 50
    },
    chatOverviewElement: {
        width: "90%",
        backgroundColor: "white",
        marginTop: "3%",
        marginBottom: "1%",
        borderBottomColor: "#212121",
        borderBottomWidth: 0.5,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        borderRadius: "10%",
        padding: "3%"
    },
    chatOverview: {
        height: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginLeft: "5%",
        marginRight: "5%"
    },
    chatOverviewName: {
        fontSize: 16,
        fontWeight: "bold"
    },
    chatMessagesTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4287f5",
        marginTop: "4%"
    },
    ChatTopBar: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "white",
        height: "15%",
        width: "100%",
        alignContent: "center",
        justifyContent: "center"
    },
    chatTopBarSection: {
        alignContent: "center",
        justifyContent: "center"
    },
    ChatTopBarBackChar: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#4287f5"
    },
    chatTopBarPicture: {
        borderRadius: "100%",
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    ChatTopBarText: {
        marginTop: "2%",
        fontWeight: "bold"
    },
    ChatTopBarBillChar: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#4287f5",
        textAlign: "center"
    },
    ChatWriterField: {
        height: "15%",
        backgroundColor: "white",
        alignContent: "center",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    ChatWriterInputField: {
        backgroundColor: "#e6e6e6",
        width: "75%",
        marginLeft: "5%",
        marginTop: "5%",
        minHeight: "25%",
        padding: "2%",
        borderRadius: "15%"
    },
    ChatWriterSend: {
        marginTop: "5%",
        marginLeft: "2%",
        justifyContent: "center",
        alignContent: "center"
    },
    ChatWriterSendText: {
        fontSize: 40,
        fontWeight: "bold"
    },
    ChatWriterTimeStyle: {
        fontSize: 8,
        textAlign: "right",
        fontStyle: "italic"
    },
    billingTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4287f5",
        marginTop: "4%",
        textAlign: "auto"
    },
    billingTextTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4287f5",
        textAlign: "center"
    },
    billingInputSection: {
        marginTop: "5%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    billingInputSectionUnder1: {
        justifyContent: "center",
        width: "60%"
    },
    billingInputSectionUnder2: {
        marginLeft: "5%",
        width: "35%"

    },
    billingText: {
        fontWeight: "bold"
    },
    billindInputField: {
        height: 40,
        padding: 10,
        backgroundColor: "#edebeb",
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    registerInputTextInput2: {
        height: 40,
        padding: 10,
        backgroundColor: "#edebeb",
        marginTop: 10,
        marginBottom: 10,
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        width: "100%",
        borderRadius: 10,
    },
    registerInputTextInput3: {
        flexWrap: "wrap-reverse",
        width: "50%",
        height: 40,
        padding: 10,
        backgroundColor: "#edebeb",
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    registerInputTextInput4: {
        height: 40,
        padding: 10,
        backgroundColor: "#edebeb",
        marginTop: 10,
        marginBottom: 10,
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        width: "100%",
        borderRadius: 10,
    },
    registerInputTextInput5: {
        height: 40,
        padding: 10,
        backgroundColor: "#edebeb",
        marginTop: 10,
        marginBottom: 10,
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        width: "100%",
        borderRadius: 10,
    },
    containerProfileItem: {
        backgroundColor: "#FFFFFF",
        paddingTop: 20,
        paddingBottom: 20,
        margin: 20,
        marginBottom: 5,
        borderRadius: 8,
    },
    descriptionProfileItem: {
        color: "#000000",
        fontSize: 18
    },
    name: {
        color: "#000000",
        fontSize: 25,
        fontWeight: "bold"
    },
    titleProfileItem: {
        color: "#000000",
        fontSize: 18,
        fontWeight: "bold"
    },
    titleFilterItem: {
        color: "#000000",
        fontSize: 15,
        fontWeight: "bold"
    },
    profileDescription: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 25,
        marginRight: 125
    },
    filterDescription: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 25,
        marginRight: 125
    },
    editProfileButton: {
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        width: "90%",
        borderRadius: 10,
        backgroundColor: 'blue',
        padding: 10,
        marginTop: 10
    },
    saveProfileButton: {
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        width: "100%",
        borderRadius: 10,
        backgroundColor: 'blue',
        padding: 10
    },
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    container2: {
        flex: 1,
        backgroundColor: "gray",
        paddingTop: 100
    },
    header: {
        backgroundColor: "#F5FCFF",
        padding: 10
    },
    headerText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500"
    },
    content: {
        padding: 20,
        backgroundColor: "#fff"
    }
});

export {styles}