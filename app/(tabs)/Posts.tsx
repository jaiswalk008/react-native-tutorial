import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Pressable,StyleSheet ,FlatList,ActivityIndicator, Platform, KeyboardAvoidingView, useWindowDimensions} from "react-native";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import axios from 'axios'
import ToastManager, { Toast } from "toastify-react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";

export default function Posts(limit=10){
    const [posts,setPosts] = useState<any>([])
    const [loading,setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [title,setTitle] =useState('')
    const [body,setBody] =useState('')
    const [isPosting,setIsPosting] = useState(false)
    const [error,setError] = useState("");
    const windowWidth = useWindowDimensions().width;

    async function fetchData(limit:number=10){
        try{
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
            setPosts(res.data)
            Toast.success("Data fetched successfully","top")
        }
        catch(err:any){
            console.log(err.message)
            Toast.error("Failed to fetch the posts")
        }finally {
            setLoading(false);  // ✅ Always set loading to false at the end
        }
    }
    async function addPost(){
        setIsPosting(true)
        try {
            const res = axios.post('https://jsonplaceholder.typicode.com/posts',{title,body});
            setPosts([{title,body},...posts])
            Toast.success("Post added successfully")
        } catch (error) {
          console.log(error)  
          Toast.error("Failed to add post")
        }
        finally{
            setIsPosting(false)
            setTitle('')
            setBody('')
        }
    }
    useEffect(() =>{
        fetchData();
    },[])
    if(loading){
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator  size="large" color="#000"/>
            </SafeAreaView>
        )
    }
    async function handleRefresh(){
        setRefreshing(true)
        await fetchData(20)
        setRefreshing(false)

    }
    return (
    <GestureHandlerRootView>
            <SafeAreaProvider>                   
                    
                    <ToastManager width={300}  hasBackdrop/>
                    <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS==='ios'? 100 :0} behavior="padding" style={{width:windowWidth > 600 ? "60%" : "80%",display:"flex",gap:20,alignItems:"center",justifyContent:"space-evenly",borderColor:"#000",padding:20,borderRadius:10}}>
                    
                    <View style={styles.inputContainer}>
                          <Text style={{ fontSize: 18, textAlign: "left" }}>Title</Text>
                          <TextInput placeholder="Enter title" value={title} onChangeText={setTitle} style={styles.input} />
                      </View>
        
                      <View style={styles.inputContainer}>
                          <Text style={{ fontSize: 18, textAlign: "left" }}>Body</Text>
                          <TextInput placeholder="Enter body" value={body} onChangeText={setBody} style={styles.input} />
                      </View>
                        <Pressable style={styles.submitButton}   onPress={addPost}><Text style={{color:"white",fontSize:16}}>{isPosting? "Adding..." : "Add Post"}</Text></Pressable>
                      
                      </KeyboardAvoidingView>
                    <View style={styles.listContainer}>
                        <FlatList 
                            data={posts}
                            
                            renderItem={({ item, index }: { item: { title: string, body: string }, index: number }) => {
                                return (
                                  <View style={styles.card}>
                                    <Text style={styles.titleText}>{index+1}. {item.title}</Text>
                                    <Text style={styles.bodyText}>{item.body}</Text>
                                  </View>
                                );
                              }}
                              ItemSeparatorComponent={() => <View style={{height:16}}></View>}
                              keyExtractor={(item, index) => index.toString()}
                              ListEmptyComponent={() =><Text>No posts to show !!</Text>}
                              ListHeaderComponent={() => <Text style={{textAlign:"center",fontSize:30}}>Posts</Text>}
                              refreshing={refreshing}
                              onRefresh={handleRefresh}
                            />
                    </View>
                    </SafeAreaView>
                    
                </SafeAreaProvider>
    </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Platform.OS==='android'?StatusBar.currentHeight: 10,
    },
    listContainer:{
        flex:1,
        paddingHorizontal:16,

    },
    submitButton:{
        backgroundColor:"#000",
        padding:10,
        borderRadius:8,
        marginBottom: Platform.OS==='android' ?  20 :0,
        width:100,
        alignItems:"center"
    },
    card:{
        backgroundColor:"#f5f5f5",
        borderRadius:8,
        padding:16,
        borderWidth:1
    },
    titleText:{
        fontSize:28,
        fontWeight:"bold",
        marginBottom:8,
    },
    bodyText:{
        fontSize:24,
        color:"#000"
    },
    loadingContainer:{
        flex:1,
        backgroundColor:"#f5f5f5",
        paddingTop:StatusBar.currentHeight,
        justifyContent:"center",
        alignItems:"center"
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
})