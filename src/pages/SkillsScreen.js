import React, {useEffect} from "react";
import {SafeAreaView, View} from "react-native";
import {UpdateUserProfile, GetProfileById, AddSkill} from "../connectors/ProfileServiceConnector";

const SkillsScreen = ({navigation}) => {

    //const [userId, setUserId] = React.useState("")
    const userId = 2
    let skills = []

    let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzI0OTczNDYsInN1YiI6MiwidXNlciI6Mn0.X1FuU3eXymiq-sWwIvCr4g__EGo5ghHemnUg5B_-VRuIFxWo_hw1qUZCV9T74pSqWF_ChMCZvwDU9a6X1SsBu-RNHq8FwcYos2VHoa6ZLaXp9ZJQK8ekMxfSNKme5uvjm1IuIYCDwfO7JWBdnNSwDVY5X7-5w9cuq1TXqSdw8cQ"

    useEffect(() => {
        GetUserSkills()
    }, [])

    async function GetUserSkills(){
        GetProfileById(userId, token).then(r => {
            r.map((skill, index) => {
                skills[index] = skill
            })
        })
    }

    async function UpdateUserSkills(){
        UpdateUserProfile().then(r =>
            console.log(r)
        )
    }

    async function AddUserSkills(){
        AddSkill().then(r => {
            console.log(r)
        })
        UpdateUserProfile().then(r =>
            console.log(r)
        )
    }

    async function DeleteUserSkills(){
        UpdateUserProfile().then(r =>
            console.log(r)
        )
    }

    return (
        <SafeAreaView>
            <View>
                <>
                </>
            </View>
        </SafeAreaView>
    )
}

export default SkillsScreen;