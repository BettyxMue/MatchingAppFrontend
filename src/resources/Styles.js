// @ts-nocheck
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
        height: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    registerBackground: {
        marginTop:  "45%",
        marginBottom: "25%",
        width: "75%",
        padding: "10%",
        borderRadius: 40,
        alignContent: "center",
        backgroundColor: 'white',
        marginRight: "15%",
        marginLeft: "15%"        
    },
    registerTitle:{
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
        padding:5,
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
        padding:5,
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
        backgroundColor: "white",
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
        color: "black",
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
        backgroundColor:"white",
        alignContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "white"
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
    billingTextTitle:{
        fontSize: 16,
        fontWeight: "bold",
        color: "#4287f5",
        textAlign: "center"
    },
    billingInputSection:{
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
    invoiceOverviewHeader: {
        backgroundColor: "#c7c7c7",
        padding: "2%",
        marginBottom: "2%"
    },
    invoiceOverviewBox: {
        margin: "5%",
        borderColor: "#c7c7c7",
        backgroundColor: "white",
        borderRadius: "5%",
        borderWidth: 1
    },
    invoiceOverviewHeaderText: {
        fontWeight: "bold",
    },
    invoiceOverviewSubheaderText:{
        marginBottom: "2%"
    },
    invoiceOverviewDetailButtonText: {
        color: "#5e5e5e",
        marginLeft: "4%"
    },
    invoiceOverviewDetailButton:{
        color: "#4287f5",
        fontWeight: "bold",
        fontSize: 16
    },
    invoiceOverviewBody: {
        margin: "2%"
    },
    invoiceOverviewInvoiceSection: {
        borderColor: "black",
        borderWidth: 0.5
    },
    invoiceDetailsSectionHeader: {
        backgroundColor: "#c7c7c7",
        padding: "5%",
        marginBottom: "2%"
    },
    invoiceDetailsSectionHeaderText: {
        fontWeight: "bold",
        fontSize: 16
    },
    invoiceDetailHeaderTitle:{
        fontWeight: "bold",
        marginBottom: "2%"
    },
    invoiceDetailHeaderText:{
        marginBottom: "2%"
    },
    invoiceDetailPayedText:{
        fontWeight: "bold",
        marginLeft: "2%"
    },
    invoiceTotalSection: {
        display: "flex", 
        flexDirection: "row", 
        flexWrap: "wrap", 
        alignContent:"center",
        borderTopWidth: 1, 
        borderColor: "#c7c7c7",
        paddingTop: "5%",
        paddingBottom: "5%"
    },
    invoiceTotalHeader: {
        fontWeight: "bold",
        fontSize: 16
    },
    paymentHeader: {
        height: "25%",
        backgroundColor: "#c7c7c7",
        justifyContent: "center",
        alignContent: "center"
    },
    paymentHeaderText: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center"
    },
    paymentBodyHeader: {
        fontWeight: "bold"
    },
    paymentBodyText: {
        marginBottom: "2%"
    }
}); 

export {styles}