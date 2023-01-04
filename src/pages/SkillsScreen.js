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
import {getToken, getUser} from "../resources/InternalStorage";

const SkillsScreen = ({navigation}) => {

    const [userId, setUserId] = React.useState("")

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
    const [skillId, setSkillId] = React.useState("")

    useEffect(() => {
        SetUser().then(r => {
            GetUserData(r)
        })
        GetPossibleSkills()
    }, [])

    async function SetUser() {
        const user = await getUser()
        setUserId(user.id)
        return user.id
    }

    async function GetUserData(userId) {
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
                if (skills.length == 0) {
                    skills[index] = {
                        id: skill.id,
                        name: skill.name
                    }
                } else {
                    skills.map(skill2 => {
                        if (skill2.name != skill.name){
                            skills[index] = {
                                id: skill.id,
                                name: skill.name
                            }
                        }
                    })
                }
            })
            setPossibleSkills(skills)
        })
    }

    function FindSkillId(skillName, skillIdentifier){
        GetAllSkills().then(r => {
            r.map(skill => {
                if (skill.name == skillName && skill.SkillIdentifier == skillIdentifier) {
                    return skill.id
                }
            })
        })
    }

    function waitForElement(){
        if(skillId !== undefined){
            //variable exists, do what you want
        }
        else{
            setTimeout(waitForElement, 250);
        }
    }

    async function UpdateUserSkills(skillName, newSkillLevel) {

        let newSkillLevelId
        switch (newSkillLevel) {
            case "Anfänger":
                newSkillLevelId = 1
                break
            case "Fortgeschritten":
                newSkillLevelId = 2
                break
            case "Experte":
                newSkillLevelId = 3
                break
        }

        FindSkillId(skillName, newSkillLevelId).then(r => {
            setSkillId(r)
        })

        waitForElement()

        let newSkill
        achievedSkills.map(skill => {
            if (skillId == skill.id) {
                const index = achievedSkills.indexOf(skill)
                newSkill = {
                    id: skillId
                }
                achievedSkills[index] = newSkill
            }
        })

        UpdateUserProfile(gender, price, phoneNumber, firstName, name, userName, email, city, plz, street, houseNumber, searchedSkills, achievedSkills).then(r => {
            console.log(r)
        })
        setToggle(false)
        GetPossibleSkills()
    }

    async function AddUserSkills(skillName, skillLevel) {

        let newSkillLevelId
        switch (skillLevel) {
            case "Anfänger":
                newSkillLevelId = 1
                break
            case "Fortgeschritten":
                newSkillLevelId = 2
                break
            case "Experte":
                newSkillLevelId = 3
                break
        }

        FindSkillId(skillName, newSkillLevelId).then(r => {
            setSkillId(r)
            const newSkill = {
                id: r
            }
            console.log(newSkill)

            achievedSkills.push(newSkill)
            console.log(achievedSkills)

            UpdateUserProfile(gender, price, phoneNumber, firstName, name, userName, email, city, plz, street, houseNumber, searchedSkills, achievedSkills).then(r => {
                console.log(r)
            })
            setAddToggle(false)
            GetPossibleSkills()
        })
    }

    async function RemoveSkill(skillName, skillLevel) {
        let newSkillLevelId
        switch (skillLevel) {
            case "Anfänger":
                newSkillLevelId = 1
                break
            case "Fortgeschritten":
                newSkillLevelId = 2
                break
            case "Experte":
                newSkillLevelId = 3
                break
        }

        FindSkillId(skillName, newSkillLevelId).then(r => {
            setSkillId(r)
        })

        achievedSkills.map(skill => {
            if (skillId == skill.id) {
                const index = achievedSkills.indexOf(skill)
                delete achievedSkills[index]
            }
        })

        UpdateUserProfile(gender, price, phoneNumber, firstName, name, userName, email, city, plz, street, houseNumber, searchedSkills, achievedSkills).then(r => {
            console.log(r)
        })
        setToggle(false)
        GetPossibleSkills()
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
                {achievedSkills.map((skill, index) => (
                    <Collapse key={index} style={{borderBottomWidth: 1, borderTopWidth: 1}}>
                        <CollapseHeader style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                            backgroundColor: '#E6E6E6'
                        }}>
                            <View style={{width: '100%'}}>
                                <Text>{skill.name}</Text>
                            </View>
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
                                                          onPress={() => UpdateUserSkills(skill.name, level)}>
                                            <Entypo name="check" size={30} color="green"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View style={{
                                    flexDirection: "row",
                                    margin: 10
                                }}>
                                    <Text>Level: {renderSwitch(skill.SkillIdentifier)}</Text>
                                    <View style={{
                                        alignItems: "flex-end",
                                        flexDirection: "row",
                                        paddingLeft: 220
                                    }}>
                                        <TouchableOpacity onPress={() => setToggle(true)}>
                                            <Entypo name="pencil" size={30} color="grey"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => RemoveSkill(skill.name, skill.level)}>
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
                        <TouchableOpacity style={styles.editProfileButton}
                                          onPress={() => AddUserSkills(skillName, level)}>
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