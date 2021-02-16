import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {SafeAreaView, View, FlatList, Image } from 'react-native';

import {timelinePage} from './styles';
import {PostItem, PostInput, Header, TopicSelectModal, Background} from '../components';
import moment from 'moment';


const user = auth().currentUser;

const Timeline = () => {
  
  const [postList, setPostList] = useState([]);
  const [topicModalFlag, setTopicModalFlag] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);


  const emptyData = [];

  const selectingTopic = (value) => {

    database().ref(`/${selectedTopic}/`).off('value');

    setSelectedTopic(value);
    setTopicModalFlag(false); 

    database() // check firebase readable rules ... !
    .ref(`${value}`)
    .on('value', (snapshot) => {
        const data = snapshot.val() 
        if(data === null){
         const emptyFormatted = Object.keys(emptyData).map(key => ({...emptyData[key]}));
         setPostList(emptyFormatted)
        }
        else{
          const formattedData = Object.keys(data).map(key =>  ({...data[key] }));

          formattedData.sort((a,b) => {
            return new Date(b.time) - new Date(a.time)
          });
    
          setPostList(formattedData);
        }   
      });
  };
  
  

  const sendingPost = (value) => {    
    const postObject = {
     
      userMail: user.email,
      postText: value,
      time: moment().toISOString()
   }
      database().ref(`${selectedTopic}/`).push(postObject);
  };
 
  const renderPosts = ({item}) => <PostItem post={item}/>

  return (
    <SafeAreaView style={timelinePage.container}>
      <View style={timelinePage.container}>        
       
        <Header 
           onTopicModalSelect={() => setTopicModalFlag(true)}
           title={selectedTopic}   
           onLogOut={() =>auth()
            .signOut()
            .then(() => console.log('User signed out!'))
          }
        />
        
        <FlatList 
          keyExtractor = {(_,i) => i.toString()}
          data = {postList}
          renderItem = {renderPosts}
        />
        
        <PostInput onSendPost={sendingPost} />
        
        <TopicSelectModal
          visibility={topicModalFlag}
          onClose={() => selectedTopic ? setTopicModalFlag(false) : null}
          onTopicSelect={selectingTopic}
        />
      </View>
    </SafeAreaView>
  );
};

export {Timeline};
