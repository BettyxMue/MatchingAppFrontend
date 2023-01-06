import {
    SafeAreaView,
    TouchableOpacity,
    View,
    Image,
    Text,
    StyleSheet,
} from "react-native";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {AntDesign, Entypo, Ionicons} from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {getToken, getUser} from "../resources/InternalStorage";
import {GetProfileById} from "../connectors/ProfileServiceConnector";
import Toast from "react-native-root-toast";
import {Dislike, GetSearchesByUser, Like, Searching} from "../connectors/MatchingServiceConnector";
import {SelectList} from "react-native-dropdown-select-list/index";

const HomeScreen = ({navigation}) => {
    //const navigation = useNavigation();
    const userId = 2;
    const [profiles, setProfiles] = useState([]);
    const [userData, setUserData] = useState([]);
    const [searchId, setSearchId] = useState("")
    const [selectedFilter, setSelectedFilter] = useState("");
    const [filterCreated, setFilterCreated] = useState(false);
    const [filtersData, setFiltersData] = useState([]);
    let filterOptionData = [];
    let tempArray = []

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

    useEffect(() => {
        GetUserData();
        GetFilterOptionData();
    }, [userId, searchId]);

    async function GetUserData() {
        GetProfileById(userId, getToken()).then(r => {
            if (typeof r !== 'object') {
                showErrorMessage(r);
                return;
            }
            setUserData(r)
        });
    }

    async function GetFilterOptionData() {
        GetSearchesByUser(userId).then(r => {
            filterOptionData = [];
            r.forEach(i => {
                filterOptionData[i.searchid] = i.name;
            })
            setFiltersData(filterOptionData);
        })
        setFilterCreated(true);
    }

    async function StartSearch(val) {
        filtersData.forEach(i => {
            if (i == val){
                setSearchId(filtersData.indexOf(i).toString())
            }
        })

        Searching(searchId, userId).then(r => {
            let ctr = 0
            r.forEach(i => {
                tempArray[ctr] = {
                    id: i.id,
                    name: i.name,
                    firstName: i.firstName,
                    city: i.city,
                    gender: i.gender,
                    picture: i.pictures[0]
                }
                ctr++
            })
            setProfiles(tempArray)
        })
    }

    const swipeRef = useRef(null);

    const swipeLeft = async (cardIndex) => {
        if (!profiles[cardIndex]) return;
        const userSwipedId = profiles[cardIndex].id;
        Dislike(userId, userSwipedId).then(r => {
            if (r.status !== '200') {
                showErrorMessage(r);
                return;
            }
        })
    };

    const swipeRight = async (cardIndex) => {
        if (!profiles[cardIndex]) return;
        const userSwipedId = profiles[cardIndex].id;
        console.log(userSwipedId)
        Like(userId, userSwipedId).then(r => {
            if (r.status === '201') {
                navigation.navigate("Match", {
                    userId,
                    userSwipedId,
                });
            }
        })
    };

    function navigateToProfile() {
        navigation.navigate("Profile")
    }

    return (
        <View>
            <>
                {filterCreated ? (
                    <>
                        <View>
                            <SelectList
                                setSelected={(val) => StartSearch(val)}
                                data={filtersData}
                                save="value"
                            />
                        </View>
                        <View>
                            <Swiper
                                containerStyle={{backgroundColor: "#3860ff"}}
                                cards={profiles}
                                stackSize={5}
                                cardIndex={0}
                                animateCardOpacity
                                verticalSwipe={false}
                                ref={swipeRef}
                                onSwipedLeft={(cardIndex) => {
                                    swipeLeft(cardIndex);
                                }}
                                onSwipedRight={(cardIndex) => {
                                    swipeRight(cardIndex);
                                }}
                                backgroundColor={"#4FD0E9"}
                                overlayLabels={{
                                    left: {
                                        title: "DISLIKE",
                                        style: {
                                            label: {
                                                textAlign: "right",
                                                color: "red",
                                            },
                                        },
                                    },
                                    right: {
                                        title: "LIKE",
                                        style: {
                                            label: {
                                                color: "green",
                                            },
                                        },
                                    },
                                }}
                                renderCard={(card) =>
                                    card ? (
                                        <View
                                            key={card.id}
                                        >
                                            <Image
                                                //source={{uri: card.picture}}
                                            />
                                            <View
                                                style={[
                                                    styles.cardShadow,
                                                ]}
                                            >
                                                <View>
                                                    <Text>
                                                        {card.firstName} {card.name}
                                                    </Text>
                                                </View>

                                                <View
                                                    style={[
                                                        {flexShrink: 1},
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            {flex: 1, flexWrap: "wrap"},
                                                        ]}
                                                    >
                                                        {card.gender + ", " + card.city}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    ) : (
                                        <View
                                            style={[
                                                styles.cardShadow,
                                            ]}
                                        >
                                            <Text>Du hast alle passenden Profile durchgeschaut...</Text>
                                            <Image
                                                height={100}
                                                width={100}
                                                source={{uri: "https://links.papareact.com/6gb"}}
                                            />
                                        </View>
                                    )
                                }
                            />
                        </View>
                        <View style="flex flex-row justify-evenly">
                            <TouchableOpacity
                                sytle="items-center justify-center rounded-full w-16 h-16 bg-red-200"
                                onPress={() => swipeRef.current.swipeLeft()}
                            >
                                <Entypo name="cross" size={24} color="red"/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => swipeRef.current.swipeRight()}
                            >
                                <AntDesign name="check" size={24} color="green"/>
                            </TouchableOpacity>
                        </View>
                        {/* Footer */}
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                                <Entypo name="user" size={30} color="blue"/>
                                {/*<Image
                                    source={{uri: userData.pictures[0]}}
                                />*/}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                                <Entypo name="home" size={30} color="blue"/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                                <Entypo name="chat" size={30} color="blue"/>
                            </TouchableOpacity>
                        </View>
                        {/* End of Footer */}
                    </>
                ) : (
                    <>
                        <View>
                            <SelectList
                                setSelected={navigateToProfile}
                                data={[
                                    {key: 1, value: "Bitte erstelle im Profil einen Filter!"}
                                ]}
                                save="value"
                            />
                        </View>
                        <View>
                            <Text>Bitte wähle oder erstelle einen Filter, um die Suche zu starten!</Text>
                        </View>
                        {/* Footer */}
                        <View>
                            <TouchableOpacity onPress={navigation.navigate("Profile")}>
                                <Image
                                    source={{uri: userData.picture}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                                <Image
                                    resizeMode="contain"
                                    //source={require(eigenes Logo)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                                <Ionicons name="chatbubbles-sharp" size={30} color="#ff8836"/>
                            </TouchableOpacity>
                        </View>
                        {/* End of Footer */}
                    </>
                )}
            </>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
});