import { useState } from "react";
import { SafeAreaView ,View, Text,StyleSheet, StatusBar, TextInput, Button, Pressable, useWindowDimensions, KeyboardAvoidingView, Platform} from "react-native";

export default function Form(){
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [phone,setPhone] = useState('')
    const [errors,setErrors] = useState<any>({})
    function validateForm(){
        let errors:any={};
        if(!name) errors.name = "Name is required";
        if(!password) errors.password = "Password is required";
        if(!phone) errors.phone = "Phone number is required";
        setErrors(errors);
        return Object.keys(errors).length===0;
    }   
    function handleSubmit(){
        const result = validateForm();
        if(result){
            console.log("form submitted",name ,phone);
            setName('');
            setPassword(''); setPassword('');setErrors({});

        }
    }
    const windowWidth = useWindowDimensions().height;
    return (
        <SafeAreaView style={styles.container}>
          <Text style={{fontWeight:600,fontSize:32,textAlign:"center",marginBottom:16}}>Login</Text>
       
          <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS==='ios'? 100 :0} behavior="padding" style={{width:windowWidth > 600 ? "80%" : "50%",display:"flex",gap:20,alignItems:"center",justifyContent:"space-evenly",borderWidth:2,borderColor:"#000",padding:20,borderRadius:10}}>

            <View style={styles.inputContainer}>
            <Text style={{fontSize:18,textAlign:"left"}}>Name</Text>
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input}/>
            {errors.name && <Text style={styles.error} >{errors.name}</Text>}
            </View>

            <View style={styles.inputContainer}>
            <Text style={{fontSize:18,textAlign:"left"}}>Phone</Text>
            <TextInput placeholder="Phone Number" keyboardType="numeric" value={phone} onChangeText={setPhone} style={styles.input}/>
            {errors.phone && <Text style={styles.error} >{errors.phone}</Text>}

            </View>

            <View style={styles.inputContainer}>
            <Text style={{fontSize:18,textAlign:"left"}}>Password</Text>
            <TextInput placeholder="Password" autoCapitalize="none" secureTextEntry value={password} onChangeText={setPassword} style={styles.input}/>
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            </View>

            <Pressable style={styles.submitButton}   onPress={handleSubmit}><Text style={{color:"white",fontSize:16}}>Login</Text></Pressable>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
        paddingTop:StatusBar.currentHeight
    },
    inputContainer:{
        display:"flex",flexDirection:"column",gap:5,justifyContent:"flex-start",width:"80%"
    },
    input:{
        height:40,
        borderWidth:1,
        width:"100%",
        padding:10,
        borderRadius:8,
        borderColor:"#000",
    },
    submitButton:{
        backgroundColor:"#002c41",
        padding:10,
        borderRadius:8,
        marginBottom: Platform.OS==='android' ?  20 :0,
        width:100,
        alignItems:"center"
    },
    error:{
        color:"red",
        fontSize:12,
        textAlign:"left"
    
    }
});