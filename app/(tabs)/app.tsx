import { View,Text,Image, ImageBackground, ScrollView, Button, Pressable ,Modal,StyleSheet, ActivityIndicator } from "react-native";
import { useState } from "react";
const logoImg = require("../../assets/images/icon.png")

export default function App(){
    const styles = StyleSheet.create({
        modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        },
        modalContent: {
          width: 400,
          height: 400,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          padding: 20,
          display:"flex",
          gap:5
        },
      });
    const [openModal,setOpenModal] =useState(false)
    
    return <View style={{display:"flex",justifyContent:"center",flexDirection:"row",alignItems:"center",gap:"1rem",flex:1,backgroundColor:"plum"}}>
        <ScrollView contentContainerStyle={{
        alignItems: "center",
        paddingVertical: 40,
        gap: 16
        ,flexDirection:"row",
        display:"flex",
        justifyContent:"center",
        }}>
        <Pressable onLongPress={() => console.log('Text pressed!!')}><Text>Pressable Comppnent</Text></Pressable>
        <Button title="Click" color="midnightblue"  onPress={() => setOpenModal(true)} />
        <Modal visible={openModal} transparent animationType="fade" onRequestClose={() => setOpenModal(false)} presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={{ uri: 'https://picsum.photos/200' }}
              style={{ width: 200, height: 200 }}
            />
            <ActivityIndicator/>
            <ActivityIndicator size="large" color="red" animating/>
            <Button title="Close" color="red" onPress={() => setOpenModal(false)} />
          </View>
        </View>
      </Modal>
        <Pressable onPressOut={() => console.log('Image pressed!!')}><Image source={{uri:'https://picsum.photos/200'}} style={{width:200,height:200}}/></Pressable>
        <ImageBackground source={logoImg} style={{width:200,height:200}}>
            <Text>Image with text</Text>
        </ImageBackground>
        </ScrollView>
        
    </View>

}