
import React from "react";
import { Pressable, Text } from "react-native";

const customButton = ({onPress, title}:any) =>{
    return (
        <Pressable onPress={onPress} style={{
            backgroundColor: 'yellow',
            padding: 10,
            borderRadius: 5,
            margin: 10
        }}>
            <Text style={{color:"blue",fontSize:18}}>{title}</Text>
    
        </Pressable>
    )

}
export default customButton;