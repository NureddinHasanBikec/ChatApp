import React, {useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {authStyle} from './styles';
import {Input, Button} from '../components';
import {resolveAuthError} from '../functions';




    const Login = (props) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login( ){     
       
      try {
          if(email === '' || password === ''){
              Alert.alert("acb.Chat", resolveAuthError('auth/null-value'))
            }
          else{
            await auth().signInWithEmailAndPassword( email, password );
            props.navigation.navigate("Timeline"); 
          }
      } 
      
      catch (error) {
        Alert.alert("acb.Chat", resolveAuthError(error.code))
      }
      
    
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#cfd8dc'}}>
          <ScrollView contentContainerStyle={{flex: 1}}>
            
              <View style={authStyle.container}>
                <Image
                  style={authStyle.logo}
                  source={require("../assets/logo.png")}
                />
              </View>
              
              <View style={{flex: 1}}> 
                  <Input
                      inputProps={{
                        placeholder: "Text your email...",
                        keyboardType: "email-address"
                      }}          
                      onType={value => setEmail(value)}     
                  />
                  <Input
                      inputProps={{
                        placeholder: "Text your password...",
                        secureTextEntry: true                       
                      }}
                      onType={value => setPassword(value)}
                  />
                  <Button 
                    title="Sign In"
                    onPress={()=>login()}
                    />
                  <Button 
                    title="Sign Up" 
                    noBorder 
                    onPress={()=>props.navigation.navigate("Sign")} />
              </View>
            
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export {Login};
  