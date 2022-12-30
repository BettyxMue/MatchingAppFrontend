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
import {useTailwind} from "tailwind-rn/dist";
import {styles} from "../resources/Styles";
import {LinearGradient} from "expo-linear-gradient";

const HomeScreen = ({navigation}) => {
    //const navigation = useNavigation();
    const userId = 2;
    const [profiles, setProfiles] = React.useState([]);
    const [userData, setUserData] = React.useState([]);
    const [searchId, setSearchId] = React.useState("")
    const [selectedFilter, setSelectedFilter] = React.useState("");
    const [filterCreated, setFilterCreated] = React.useState(false);
    const [filtersData, setFiltersData] = React.useState([]);
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
    }, []);

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
            if (i == val) {
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

    return (
        <SafeAreaView style={{
            height: '100%',
            width: '100%',
            alignContent: "center"
        }}>
            <LinearGradient colors={['#3860ff', '#389bff']} style={styles.container}>
                <View>
                    {filterCreated ? (
                        <>
                            <View>
                                <SelectList
                                    setSelected={(val) => StartSearch(val)}
                                    data={filtersData}
                                    save="value"
                                />
                            </View>
                            <View style="flex-1 mt-6">
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
                                                style="bg-white h-3/4 rounded-xl relative"
                                            >
                                                <Image
                                                    style="absolute top-0 h-full w-full rounded-xl"
                                                    //source={{uri: card.picture}}
                                                />
                                                <View
                                                    style={[
                                                        "bg-white w-full absolute bottom-0 flex-col px-6 py-2 rounded-b-lg",
                                                        styles.cardShadow,
                                                    ]}
                                                >
                                                    <View style="flex-row justify-between">
                                                        <Text style="text-2xl font-bold">
                                                            {card.firstName} {card.name}
                                                        </Text>
                                                    </View>

                                                    <View
                                                        style={[
                                                            "mt-2 flex-row justify-between",
                                                            {flexShrink: 1},
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                "text-right pl-5",
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
                                                    "relative bg-white h-3/4 rounded-xl justify-center items-center",
                                                    styles.cardShadow,
                                                ]}
                                            >
                                                <Text style="font-bold pb-5">Du hast alle passenden Profile
                                                    durchgeschaut...</Text>
                                                <Image
                                                    style="h-20 w-full"
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
                            <View style="flex-row px-5 justify-between items-center relative">
                                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                                    <Entypo name="user" size={30} color="blue"/>
                                    {/*<Image
                                    source={{uri: userData.pictures[0]}}r
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
                                    setSelected={() => navigation.navigate("Profile")}
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
                                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default HomeScreen;