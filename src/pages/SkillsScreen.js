import React, {useEffect} from "react";
import {KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {
    UpdateUserProfile,
    GetAllSkills,
    RemoveSkillFromUser, getUserFromId
} from "../connectors/ProfileServiceConnector";
import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";
import {styles} from "../resources/Styles";
import SelectDropdown from "react-native-select-dropdown";
import {Entypo} from "@expo/vector-icons";

const SkillsScreen = ({navigation}) => {

    //const [userId, setUserId] = React.useState("")
    const userId = 2

    let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzI4MDMxMTEsInN1YiI6MiwidXNlciI6Mn0.ynsCyq3kjptBtu8IlhjPiJWwC6rQXZQslNJFIKVUxeGtZb6ADFdM2xzucOiUqDRG2BHXBYgxZhSWjYc7KAVS07jgZmsoo9xR_ekGgCLenYVfIq2vTok-RbM-LkdaZPxn4N7AdAqrGTS5Xe9hUGwQ4gCc_L7D1p9vwYZ3MN3q1WM"

    const [toggle, setToggle] = React.useState(false)
    const [addToggle, setAddToggle] = React.useState(false)

    const [userName, onChangeUserName] = React.useState("")
    const [email, onChangeEmail] = React.useState("")
    const [city, onChangeCity] = React.useState("")
    const [plz, onChangePLZ] = React.useState("")
    const [street, onChangeStreet] = React.useState("")
    const [houseNumber, onChangeHouseNumber] = React.useState("")
    const [phoneNumber, onChangePhoneNumber] = React.useState("")
    const [firstName, onChangeFirstName] = React.useState("")
    const [name, onChangeName] = React.useState("")
    const [gender, onChangeGender] = React.useState("")
    const [price, onChangePrice] = React.useState("")
    const [achievedSkills, onAchievedSkills] = React.useState([])
    const [searchedSkills, onSearchedSkills] = React.useState([])

    const [skillName, onChangeSkillName] = React.useState("")
    const [level, onChangeLevel] = React.useState("")
    const possibleLevels = ["Anfänger", "Fortgeschritten", "Experte"]

    let skills = []
    const [possibleSkills, setPossibleSkills] = React.useState([])

    useEffect(() => {
        GetUserData()
        GetPossibleSkills()
    }, [])

    async function GetUserData() {
        getUserFromId(userId).then(r => {
            onChangeUserName(r.username)
            onChangeFirstName(r.firstName)
            onChangeName(r.name)
            onChangeCity(r.city.place)
            onChangePLZ((r.city.plz).toString())
            onChangeGender(r.gender)
            onChangeEmail(r.email)
            onChangeHouseNumber(r.houseNumber)
            onChangePhoneNumber(r.telephoneNumber)
            onChangeStreet(r.street)
            onChangePrice((r.price).toString())
            onAchievedSkills(r.achievedSkills)
            onSearchedSkills(r.searchedSkills)
        })
    }

    async function GetPossibleSkills() {
        GetAllSkills().then(r => {
            r.map((skill, index) => {
                skills[index] = {
                    id: skill.id,
                    name: skill.name
                }
            })
            setPossibleSkills(skills)
        })
    }

    async function FindSkillId(skillName, skillLevelId) {
        GetAllSkills().then(r => {
            console.log(r)
            r.map(skill => {
                if (skill.name == skillName && skill.SkillIdentifier == skillLevelId) {
                    return {
                        id: skill.id,
                        name: skill.name
                    }
                }
            })
        })
    }

    async function UpdateUserSkills(skillId, skillName, newSkillLevelId) {

        RemoveSkillFromUser(userId, skillId).then(r => {
            console.log(r)
        })

        AddUserSkills(skillName, newSkillLevelId).then(r => {
            console.log(r)
        })
    }

    async function AddUserSkills(skillName, skillLevelId) {
        let newSkill = FindSkillId(skillName, skillLevelId)
        console.log(newSkill)

        let allAchievedSkills = []
        allAchievedSkills.add(achievedSkills)
        allAchievedSkills.add(newSkill)
        console.log(allAchievedSkills)

        UpdateUserProfile(gender, price, phoneNumber, firstName, name, userName, email, city, plz, street, houseNumber, searchedSkills, allAchievedSkills).then(r =>
            console.log(r)
        )
    }

    async function RemoveSkill(skillId) {
        RemoveSkillFromUser(userId, skillId).then(r => {
            console.log(r)
        })
    }

    function renderSwitch(param) {
        switch (param) {
            case "Anfänger":
                return 1
                break
            case "Fortgeschritten":
                return 2
                break
            case "Experte":
                return 3
                break
            case 1:
                return "Anfänger"
                break
            case 2:
                return "Fortgeschritten"
                break
            case 3:
                return "Experte"
                break
        }
    }

    return (
        <SafeAreaView style={{
            height: '100%',
            width: '100%',
            alignContent: "center"
        }}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{
                alignContent: "center",
                flex: 1
            }}>
                {achievedSkills.map(skill => (
                    <Collapse style={{borderBottomWidth: 1, borderTopWidth: 1}}>
                        <CollapseHeader style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                            backgroundColor: '#E6E6E6'
                        }}>
                            {toggle ?
                                <View>
                                    <SelectDropdown
                                        data={possibleSkills}
                                        onSelect={(selectedItem, index) => {
                                            onChangeSkillName(selectedItem.name)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem.name
                                        }}
                                        defaultButtonText={skill.name}
                                    />
                                </View>
                                :
                                <View style={{width: '100%'}}>
                                    <Text>{skill.name}</Text>
                                </View>
                            }
                        </CollapseHeader>
                        <CollapseBody style={{
                            alignItems: 'left',
                            justifyContent: 'left',
                            flexDirection: 'row',
                            backgroundColor: '#EDEDED'
                        }}>
                            {toggle ?
                                <View style={{
                                    width: "100%",
                                }}>
                                    <Text style={styles.titleFilterItem}>Level:</Text>
                                    <View style={{
                                        flexDirection: "row",

                                    }}>
                                        <SelectDropdown
                                            data={possibleLevels}
                                            onSelect={(selectedItem, index) => {
                                                onChangeLevel(selectedItem)
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            defaultButtonText={renderSwitch(level)}
                                        />
                                        <TouchableOpacity style={{marginLeft: 150}}
                                            onPress={() => UpdateUserSkills(skill.id, skill.name, level)}>
                                            <Entypo name="check" size={30} color="green"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View style={{
                                    flexDirection: "row",
                                    margin: 10
                                }}>
                                    <Text>Level: {skill.level}</Text>
                                    <View style={{
                                        alignItems: "flex-end",
                                        flexDirection: "row",
                                        paddingLeft: 220
                                    }}>
                                        <TouchableOpacity onPress={() => setToggle(true)}>
                                            <Entypo name="pencil" size={30} color="grey"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => RemoveSkill(skill.id)}>
                                            <Entypo name="cross" size={30} color="red"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        </CollapseBody>
                    </Collapse>
                ))}
                {addToggle ?
                    <View>
                        <Text style={styles.titleFilterItem}>Bezeichnung:</Text>
                        <SelectDropdown
                            data={possibleSkills}
                            onSelect={(selectedItem, index) => {
                                onChangeSkillName(selectedItem.name)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.name
                            }}
                            defaultButtonText={skillName}
                        />
                        <Text style={styles.titleFilterItem}>Gesuchtes Level:</Text>
                        <SelectDropdown
                            data={possibleLevels}
                            onSelect={(selectedItem, index) => {
                                onChangeLevel(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            defaultButtonText={renderSwitch(level)}
                        />
                        <TouchableOpacity style={styles.editProfileButton} onPress={() => AddUserSkills(skillName, level)}>
                            <Text style={styles.buttonText}>Speichern</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editProfileButton} onPress={() => setAddToggle(false)}>
                            <Text style={styles.buttonText}>Zurück</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{
                        marginTop: 10,
                        marginHorizontal: 5
                    }}>
                        <TouchableOpacity style={styles.saveProfileButton} onPress={() => setAddToggle(true)}>
                            <Text style={styles.buttonText}>Erstelle einen neuen Skill</Text>
                        </TouchableOpacity>
                    </View>
                }
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SkillsScreen;