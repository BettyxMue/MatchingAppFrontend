import {KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {Component, useEffect} from 'react'
import {CreateSearch, DeleteSearch, GetSearchesByUser, UpdateSearch} from "../connectors/MatchingServiceConnector";
import Toast from "react-native-root-toast";
import {Collapse, CollapseHeader, CollapseBody} from "accordion-collapse-react-native";
import {Entypo} from "@expo/vector-icons";
import {styles} from "../resources/Styles";
import {GetAllSkills, UpdateUserProfile} from "../connectors/ProfileServiceConnector";
import SelectDropdown from "react-native-select-dropdown";

const FilterScreen = ({navigation}) => {

    async function showErrorMessage(message) {
        let toast = Toast.show(message, {
            duration: Toast.durations.LONG,
            backgroundColor: "#f5543b",
            textColor: "white",
        });
        setTimeout(function hideToast() {
            Toast.hide(toast)
        }, 5000);
    }

    //const [userId, setUserId] = React.useState("")
    const userId = 2
    let filters = [];
    const [userFilters, setUserFilters] = React.useState([])
    const [possibleSkills, setPossibleSkills] = React.useState([])

    let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzI2MDMxMzcsInN1YiI6MiwidXNlciI6Mn0.fQ7DX2j6u5qSu3bfsR8zQaNUytL_bk2z4IGkmZeIQ2mEH3wLYEb6LPSyPc3oXpzeQghliJgzKuvG1Cs-LIR3rkBsz36-z7lnzBGHShPiNR-O-PFfBGTtSCvXLCUCCXy5ZjjP_njMe1WFJ5oeRGJKieEn8btLkeSKkqp6DeUWUaw"

    const [toggle, setToggle] = React.useState(false)
    const [addToggle, setAddToggle] = React.useState(false)
    //const [searchId, setSearchId] = React.useState("")

    const [newName, onChangeName] = React.useState("")
    const [newLevel, onChangeLevel] = React.useState("")
    const [newRadius, onChangeRadius] = React.useState("")
    const [newGender, onChangeGender] = React.useState("")

    const genders = ["Weiblich", "Männlich", "Divers", "Keine Präferenz"]
    const possibleLevels = ["Anfänger", "Fortgeschritten", "Experte"]
    let skills = []

    useEffect(() => {
        GetUserFilters()
        GetPossibleSkills()
    }, [])

    async function GetUserFilters() {
        GetSearchesByUser(userId).then(r => {
            r.map((filter, index) => {
                filters[index] = {
                    searchid: filter.searchid,
                    name: filter.name,
                    level: filter.level,
                    gender: filter.gender,
                    radius: (filter.radius).toString(),
                    skill: filter.skill,
                    created_by: filter.created_by
                }
            })
            setUserFilters(filters)
        })
    }

    async function GetPossibleSkills(){
        GetAllSkills().then(r => {
            r.map((skill, index) => {
                skills[index] = {
                    id: skills.id,
                    name: skills.name
                }
            })
            setPossibleSkills(skills)
        })
    }

    async function CreateFilter(name, level, gender, radius, userId) {
        let genderNr
        switch (gender) {
            case "Männlich":
                genderNr = 1
                break
            case "Weiblich":
                genderNr = 2
                break
            case "Divers":
                genderNr = 3
                break
            case "Keine Präferenz":
                genderNr = 4
                break
        }

        let skillId;

        possibleSkills.map(skills => {
            if (skills.name == name){
                skillId = skills.id
            } else {
                showErrorMessage("Skill not found!")
            }
        })

        /*GetAllSkills().then(r => {
            r.map(skill => {
                if (skill.name == name && skill.level == level) {
                    skillId = skill.id
                } else {
                    showErrorMessage("Please create skill first!")
                }
            })
        })*/

        CreateSearch(name, skillId, level, genderNr, radius, userId).then(r => {
            console.log(r)
        })
    }

    async function DeleteFilter(searchId) {
        DeleteSearch(searchId).then(r => {
            console.log(r)
        })
    }

    async function UpdateFilter(searchId, name, skill, level, gender, radius) {
        let genderNr
        switch (gender) {
            case "Männlich":
                genderNr = 1
                break
            case "Weiblich":
                genderNr = 2
                break
            case "Divers":
                genderNr = 3
                break
            case "Keine Präferenz":
                genderNr = 4
                break
        }

        UpdateSearch(searchId, name, skill, level, genderNr, radius, userId).then(r => {
            if (r.status !== '200') {
                showErrorMessage(r);
                return;
            }
        })

        UpdateUserProfile().then(r => {
            if (r.status !== '200') {
                showErrorMessage(r);
                return;
            }
        })
        setToggle(false)
        setAddToggle(false)
    }

    function renderSwitch(param) {
        switch (param) {
            case 1:
                return "Männlich"
                break
            case 2:
                return "Weiblich"
                break
            case 3:
                return "Divers"
                break
            case 4:
                return "Keine Präferenz"
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
                {userFilters.map(filter => (
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
                                            onChangeName(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        defaultButtonText={filter.name}
                                    />
                                </View>
                                :
                                <View style={{width: '100%'}}>
                                    <Text>{filter.name}</Text>
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
                                        defaultButtonText={filter.level}
                                    />
                                    <Text style={styles.titleFilterItem}>Geschlecht:</Text>
                                    <SelectDropdown
                                        data={genders}
                                        onSelect={(selectedItem, index) => {
                                            onChangeGender(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        defaultButtonText={renderSwitch(filter.gender)}
                                    />
                                    <Text style={styles.titleFilterItem}>Radius:</Text>
                                    <TextInput
                                        onChangeText={onChangeRadius}
                                        value={filter.radius}
                                        style={styles.registerInputTextInput5}
                                        textContentType="nickname"
                                    />
                                    <TouchableOpacity
                                        onPress={() => UpdateFilter(filter.searchid, newName, filter.skill, newLevel, newGender, newRadius)}>
                                        <Entypo name="check" size={30} color="green"/>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View>
                                    <Text>Level: {filter.level}</Text>
                                    <Text>Gesuchtes Geschlecht: {renderSwitch(filter.gender)}</Text>
                                    <Text>Radius: {filter.radius}</Text>
                                    <TouchableOpacity onPress={() => setToggle(true)}>
                                        <Entypo name="pencil" size={30} color="grey"/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => DeleteFilter(filter.searchid)}>
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
                                onChangeName(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            defaultButtonText={newName}
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
                            defaultButtonText={newLevel}
                        />
                        <Text style={styles.titleFilterItem}>Gesuchtes Geschlecht:</Text>
                        <SelectDropdown
                            data={genders}
                            onSelect={(selectedItem, index) => {
                                onChangeGender(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            defaultButtonText={renderSwitch(newGender)}
                        />
                        <Text style={styles.titleFilterItem}>Gesuchter Radius:</Text>
                        <TextInput
                            onChangeText={onChangeRadius}
                            value={newRadius}
                            style={styles.registerInputTextInput5}
                            textContentType="nickname"
                        />
                        <TouchableOpacity onPress={() => CreateFilter(newName, newLevel, newGender, newRadius, userId)}>
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
                            <Text style={styles.buttonText}>Erstelle einen neuen Filter</Text>
                        </TouchableOpacity>
                    </View>
                }
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
export default FilterScreen