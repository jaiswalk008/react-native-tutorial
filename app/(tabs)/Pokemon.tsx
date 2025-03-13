import { View,StyleSheet,Text ,SafeAreaView,StatusBar, FlatListComponent, Dimensions, useWindowDimensions, SectionList} from 'react-native';
import pokemonList from '../../pokemon-data.json';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Pokemon () {
    const getGroupedData = () =>{
        const group:any={};
        pokemonList.forEach((pokemon) => {
           for (const type of pokemon.type) {
            if (!group[type]) {
                group[type] = [];
            }
            group[type].push(pokemon.name);
           }
        });
        const groupedData = Object.keys(group).map((type) => ({
            type,
            data: group[type],
        }));
        return groupedData;
    }
    console.log(getGroupedData())
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <View style={{ flex: 1 }}>
                        {/* <FlatList 
                            contentContainerStyle={{ paddingBottom: 16 }} // Prevents bottom cut-off
                            data={pokemonList}
                            renderItem={({item}) => (
                                <View style={styles.card} key={item?.id}>
                                    <Text style={styles.cardTextName}> {item?.name}</Text>
                                    <Text style={styles.cardTextTitle}>{item?.type}</Text>
                                </View>
                            )}
                            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                            ListEmptyComponent={() => <Text>No items in the list</Text>}
                            ListHeaderComponent={() => <Text style={styles.headerText}>Pokemon List</Text>}
                            ListFooterComponent={() => <Text style={styles.footerText}>End of List</Text>}
                        /> */}
                        <SectionList
                            sections={getGroupedData()}
                            renderItem={({item}) =>{
                                return(
                                    <View style={styles.card}>
                                         {/* item refers to the element in the data array */}
                                        <Text style={styles.cardTextTitle}>{item}</Text>
                                    </View>
                                )
                            }}
                            renderSectionHeader={({section}) => <Text style={styles.sectionHeaderText}>{section.type}</Text> }
                            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                            SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
                        />
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
        marginTop: StatusBar.currentHeight || 0
    },
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        width: "90%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    cardTextName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8
    },
    cardTextTitle: {
        fontSize: 18,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center"
    },
    footerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 16,
        textAlign: "center"
    },
    sectionHeaderText:{
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "left"
    
    }
});
