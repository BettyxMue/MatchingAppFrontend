// @ts-nocheck
import React from "react"
import { View, Text } from "react-native"

const ChatBubble = (props) => {
    const message = props.data
    const userId = props.userId
    const writtenBy = props.writtenBy

    let styleDecide = function(){
        if (userId === writtenBy){
            return {
                backgroundColor: "white", width: "70%", borderRadius: "10%", marginBottom: "3%",marginLeft: "4%", marginRight: "4%", padding: "4%"
            }
        }else {
            return {
                backgroundColor: "white", width: "70%", borderRadius: "10%", marginBottom: "3%",marginLeft: "4%", marginRight: "4%", padding: "4%", alignSelf: "flex-end"
            }
        }
    }

    return (
        <View style={styleDecide()}>
           <Text>{message}</Text>
        </View>
    )
}

export default ChatBubble