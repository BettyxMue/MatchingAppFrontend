// @ts-nocheck
import React from "react"
import { View, Text } from "react-native"
import { styles } from "../../resources/Styles"

const ChatBubble = (props) => {
    const message = props.data
    const userId = props.userId
    const createdAt = props.createdAt
    const writtenBy = props.writtenBy

    function formatDate(date){
        if(typeof date == "string"){
            let date = Date.parse(date)
            console.log(date)
        }
        let localDate = new Date(date)
        return localDate.toLocaleDateString("de-de") + " " + localDate.toLocaleTimeString("de-de").slice(0,-3)
    }

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
            <View style={{width: "100%"}}>
                <Text>{message}</Text>
            </View>
            <View>
                <Text style={styles.ChatWriterTimeStyle}>{formatDate(createdAt)}</Text>
            </View>
           
        </View>
    )
}

export default ChatBubble