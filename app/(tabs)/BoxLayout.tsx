import { View ,StyleSheet} from "react-native";
import Box from "../components/Box"

export default function BoxLayout (){
    return (
        <View style={styles.container}>
            <Box style={{backgroundColor:"#8e9b00", top:100,left:100}}>Box1</Box>
            <Box style={{backgroundColor:"#b65d1f"}}>Box2</Box>
            <Box style={{backgroundColor:"#1c4c56"}}>Box3</Box>
            <Box style={{backgroundColor:"#ab9156",top:120,left:120,position:"relative"}}>Box4</Box>
            <Box style={{backgroundColor:"#6b0803"}}>Box5</Box>
            <Box style={{backgroundColor:"#1c4c56"}}>Box6</Box>
            <Box style={{backgroundColor:"#b95f21"}}>Box7</Box>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:64,
        borderWidth:6,
        borderColor:'red',
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        gap:10
    }   
})