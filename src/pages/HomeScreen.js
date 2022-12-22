import {
    SafeAreaView,
    TouchableOpacity,
    View,
    Image,
    Text,
    StyleSheet,
} from "react-native";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {AntDesign, Entypo, Ionicons} from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {getUser} from "../resources/InternalStorage";
import {GetProfileById} from "../connectors/ProfileServiceConnector";
import Toast from "react-native-root-toast";
import {Dislike, GetSearchesByUser, Like, Searching} from "../connectors/MatchingServiceConnector";
import {SelectList} from "react-native-dropdown-select-list/index";

const HomeScreen = ({navigation}) => {
    //const navigation = useNavigation();
    const userId = getUser();
    const [profiles, setProfiles] = useState([]);
    const [userData, setUserData] = useState([]);
    const [filterChoices, setFilterChoices] = useState([]);
    const [searchId, setSearchId] = useState("")
    const [selectedFilter, setSelectedFilter] = useState("");
    let filtersData = [];

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

    useLayoutEffect(() => {
        GetProfileById(userId).then(r => {
            if (typeof r !== 'object') {
                showErrorMessage(r);
                return;
            }
            setUserData(r)
        });
        /*const fetchUser = async () => {
            const fetchUser = await fetch(
                `https://localhost:8080/profile/${userId}`
            );
            const userData = await fetchUser.json();
            if (fetchUser.status !== 200 && !userData?.data?.user) {
                navigation.navigate("Start");
            }
            setUserData(userData);
        };
        fetchUser();*/
    }, []);

    useEffect(() => {
        GetSearchesByUser(userId).then(r => {
            setFilterChoices(r);
        })

        filterChoices.forEach(i => {
            filtersData[i] = "key: " + filterChoices[i].id + ", " + "value: " + filterChoices[i].name;
        })

        if (selectedFilter !== "") {
            setSearchId(selectedFilter.key)
            Searching(searchId, userId).then(r => {
                /*if (typeof r !== 'object'){
                    showErrorMessage(r);
                    return;
                }*/
                setProfiles(r)
            })
        } else {
            return (
                <SafeAreaView>
                    <View>
                        <SelectList
                            setSelected={navigation.navigate("Profile")}
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
                </SafeAreaView>
            )
        }
        /*const fetchCards = async () => {
            fetchProfileIds = await fetch(
                `https://localhost:8084/matches/:${userId}`
            );
            fetchProfileIds.map(async i => {
                fetchProfiles[i] = await fetch(
                    `https://localhost:8080/profile/:${i.userid}`
                );
                fetchProfilesData[i] = await fetchProfiles[i].json();
            })
            setProfiles(fetchProfilesData);
        };
        fetchCards();*/
    }, []);

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
        /*const response = fetch(`https://localhost:8084/dislike`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({ dislikerId: userId, dislikedId: userSwiped }),
        });*/
    };

    const swipeRight = async (cardIndex) => {
        if (!profiles[cardIndex]) return;
        const userSwipedId = profiles[cardIndex];
        Like(userId, userSwipedId).then(r => {
            /*if (r !== 'true') {
                showErrorMessage(r);
                return;
            }*/
            if (r.status === '200') {
                navigation.navigate("Match", {
                    userId,
                    userSwipedId,
                });
            }
        })
        /*const response = await fetch(`https://localhost:8084/like`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({ likerId: userId, likedId: userSwiped }),
        });
        const data = await response.json();*/
    };

    return (
        <SafeAreaView>
            <View>
                <SelectList
                    setSelectedFilter={setSelectedFilter}
                    data={filtersData}
                    save="value"
                />
            </View>
            <View>
                <Swiper
                    containerStyle={{backgroundColor: "transparent"}}
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
                                    color: "#ff8836",
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
                                    source={{uri: card.picture}}
                                />
                                <View
                                    style={[
                                        styles.cardShadow,
                                    ]}
                                >
                                    <View>
                                        <Text>
                                            {card.displayName}
                                        </Text>
                                        <Text>{card.age}</Text>
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
                                            {card.gender + ", " + card.age + ", " + card.city}
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
            <View>
                <TouchableOpacity
                    onPress={() => swipeRef.current.swipeLeft()}
                >
                    <Entypo name="cross" size={24} color="red"/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => swipeRef.current.swipeRight()}
                >
                    <AntDesign name="check" size={24} color="#c45200"/>
                </TouchableOpacity>
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
        </SafeAreaView>
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