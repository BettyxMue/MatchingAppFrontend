import {SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {Component, useEffect} from 'react'
import {CreateSearch, DeleteSearch, GetSearchesByUser, UpdateSearch} from "../connectors/MatchingServiceConnector";
import Toast from "react-native-root-toast";
import {Collapse, CollapseHeader, CollapseBody} from "accordion-collapse-react-native";
import {Entypo} from "@expo/vector-icons";
import {styles} from "../resources/Styles";
import {GetAllSkills} from "../connectors/ProfileServiceConnector";
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

    let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzI0OTczNDYsInN1YiI6MiwidXNlciI6Mn0.X1FuU3eXymiq-sWwIvCr4g__EGo5ghHemnUg5B_-VRuIFxWo_hw1qUZCV9T74pSqWF_ChMCZvwDU9a6X1SsBu-RNHq8FwcYos2VHoa6ZLaXp9ZJQK8ekMxfSNKme5uvjm1IuIYCDwfO7JWBdnNSwDVY5X7-5w9cuq1TXqSdw8cQ"

    const [toggle, setToggle] = React.useState(false)
    const [addToggle, setAddToggle] = React.useState(false)
    //const [searchId, setSearchId] = React.useState("")

    const [newName, onChangeName] = React.useState("")
    const [newLevel, onChangeLevel] = React.useState("")
    const [newRadius, onChangeRadius] = React.useState("")
    const [newGender, onChangeGender] = React.useState("")

    const genders = ["Weiblich", "Männlich", "Divers", "Keine Präferenz"]

    useEffect(() => {
        GetUserFilters()
    }, [])

    async function GetUserFilters() {
        GetSearchesByUser(userId).then(r => {
            r.map((filter, index) => {
                filters[index] = {
                    searchid: filter.searchid,
                    name: filter.name,
                    level: filter.level,
                    gender: filter.gender,
                    radius: filter.radius,
                    skill: filter.skill,
                    created_by: filter.created_by
                }
            })
            setUserFilters(filters)
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

        GetAllSkills().then(r => {
            r.map(skill => {
                if (skill.name == name && skill.level == level) {
                    skillId = skill.id
                } else {
                    showErrorMessage("Please create skill first!")
                }
            })
        })

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
            <View>
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
                                    <TextInput
                                        onChangeText={onChangeName}
                                        value={filter.name}
                                        style={styles.registerInputTextInput4}
                                        textContentType="nickname"
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
                                    <TextInput
                                        onChangeText={onChangeLevel}
                                        value={filter.level}
                                        style={styles.registerInputTextInput5}
                                        textContentType="none"
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
                        <TextInput
                            onChangeText={onChangeName}
                            value={newName}
                            style={styles.registerInputTextInput5}
                            textContentType="nickname"
                        />
                        <Text style={styles.titleFilterItem}>Gesuchtes Level:</Text>
                        <TextInput
                            onChangeText={onChangeLevel}
                            value={newLevel}
                            style={styles.registerInputTextInput5}
                            textContentType="none"
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
            </View>
        </SafeAreaView>
    )
}
export default FilterScreen