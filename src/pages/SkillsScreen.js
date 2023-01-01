import React, {useEffect} from "react";
import {KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {
    UpdateUserProfile,
    GetProfileById,
    AddSkill,
    GetAllSkills,
    RemoveSkillFromUser
} from "../connectors/ProfileServiceConnector";
import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";
import {styles} from "../resources/Styles";
import SelectDropdown from "react-native-select-dropdown";
import {Entypo} from "@expo/vector-icons";

const SkillsScreen = ({navigation}) => {

    //const [userId, setUserId] = React.useState("")
    const userId = 2

    let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzI2MDMxMzcsInN1YiI6MiwidXNlciI6Mn0.fQ7DX2j6u5qSu3bfsR8zQaNUytL_bk2z4IGkmZeIQ2mEH3wLYEb6LPSyPc3oXpzeQghliJgzKuvG1Cs-LIR3rkBsz36-z7lnzBGHShPiNR-O-PFfBGTtSCvXLCUCCXy5ZjjP_njMe1WFJ5oeRGJKieEn8btLkeSKkqp6DeUWUaw"

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
        GetProfileById(userId, token).then(r => {
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
            console.log(r)
            r.map((skill, index) => {
                skills[index] = {
                    id: skills.id,
                    name: skills.name
                }
            })
            setPossibleSkills(skills)
        })
    }

    async function FindSkillId(skillName, skillLevelId) {
        GetAllSkills().then(r => {
            r.map(skill => {
                if (skill.name == skillName && skill.skillLevel.id == skillLevelId) {
                    return skill.id
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

        let allAchievedSkills = []
        allAchievedSkills.add(achievedSkills)
        allAchievedSkills.add(newSkill)

        UpdateUserProfile(userId, gender, price, phoneNumber, firstName, name, userName, email, city, plz, street, houseNumber, token, searchedSkills, allAchievedSkills).then(r =>
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
                                            onChangeSkillName(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
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
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            backgroundColor: '#EDEDED'
                        }}>
                            {toggle ?
                                <View style={{
                                    width: "90%"
                                }}>
                                    <Text style={styles.titleFilterItem}>Level:</Text>
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
                                    <TouchableOpacity
                                        onPress={() => UpdateUserSkills(skill.id, skill.name, level)}>
                                        <Entypo name="check" size={30} color="green"/>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View>
                                    <Text>Level: {renderSwitch(skill.level)}</Text>
                                    <TouchableOpacity onPress={() => setToggle(true)}>
                                        <Entypo name="pencil" size={30} color="grey"/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => RemoveSkill(skill.id)}>
                                        <Entypo name="cross" size={30} color="red"/>
                                    </TouchableOpacity>
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
                                onChangeSkillName(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
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
                        <TouchableOpacity onPress={() => AddUserSkills(skillName, level)}>
                            <Text>Speichern</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setAddToggle(false)}>
                            <Text>Zurück</Text>
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