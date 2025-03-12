import { View ,StyleSheet, Text, useWindowDimensions, SafeAreaView,Platform} from "react-native";
import CustomButton from "../components/custom-button/CustomButton";
import { useState,useEffect } from "react";
export default function BoxLayout (){
    
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    return (
        <SafeAreaView style={{flex:1,backgroundColor:"plum"}}>
            <View style={styles.container}>
          <View style={[styles.box,{
            width:windowWidth> 500 ? "70%" :"90%",
            height:windowHeight > 600 ? "60%" : "90%",

          }]}>
            <Text style={[styles.text,{fontSize: windowWidth>500 ? 50 :24}]}>
                Welcome!
            </Text>
            <CustomButton title="Click Me" onPress={()=>{alert("text pressed")}}/>
          </View>
        </View>
        </SafeAreaView>
    )
}
//screen includes area with notch and all
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"plum",
        alignItems:"center",
        justifyContent:"center",
        marginTop:Platform.OS === "android" ? 40 : 0
    },
    box:{
        backgroundColor:"lightblue",
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        color:"black",
        fontWeight:"bold",
        ...Platform.select({
            ios:{
                color:"white",
                fontStyle:"italic"
            },
            android:{
                color:"black",
                fontStyle:"normal",
                
            },
            web:{
                color:"red",
                fontStyle:"italic"
            
            }
        })
    }
})