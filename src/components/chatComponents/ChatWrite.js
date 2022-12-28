import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../../resources/Styles";

const ChatWrite = () => {

    const [message, setMessage] = React.useState("")
    const sendSymbol = "\u27A4"

    return (
        <View style={styles.ChatWriterField}>
            <TextInput style={styles.ChatWriterInputField} placeholder="Nachricht" value={message} onChangeText={setMessage} />
            <TouchableOpacity style={styles.ChatWriterSend}>
                <Text style={styles.ChatWriterSendText}>{sendSymbol}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChatWrite