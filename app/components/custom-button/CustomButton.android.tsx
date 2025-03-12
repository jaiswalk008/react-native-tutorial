
import React from "react";
import { Pressable, Text } from "react-native";

const customButton = ({onPress, title}:any) =>{
    return (
        <Pressable onPress={onPress} style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 10,
            margin: 10
        }}>
            <Text style={{color:"purple",fontSize:18}}>{title}</Text>
    
        </Pressable>
    
    )
}
export default customButton;