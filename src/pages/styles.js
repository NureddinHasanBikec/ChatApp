import {StyleSheet, Dimensions} from 'react-native';

export const authStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  
  },
  logo: {
    height: Dimensions.get('window').height / 2,
    resizeMode: 'contain'
  },

});

export const timelinePage = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor: '#cfd8dc',  
  },
   
});