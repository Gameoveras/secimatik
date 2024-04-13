import React, { useRef, useEffect , useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';


export default function HomeScreen({navigation}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [ipAddress, setIpAddress] = useState('');


  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    axios.get('https://api.ipify.org?format=json')
      .then(response => setIpAddress(response.data.ip))
      .catch(error => console.error(error));
  }, []);


  const imageUrl = 'https://cdn.pixabay.com/photo/2017/04/18/11/03/choice-2238583_1280.png';


const handlePress = () => {
    navigation.navigate('Ana Sayfa', {ipAddress: ipAddress});
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Seçimatik
      </Animated.Text>
      <Text style={styles.text1}>
        Seçim  Anket uygulamamıza Hoşgeldiniz! Yerel Seçimler için anketimize katılabilirsiniz.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Ankete Başla</Text>
      </TouchableOpacity>
    </View>
  );
}
 const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cd853f',
        alignItems: 'center',
        justifyContent: 'center',
      },
      
text: {
fontSize: 36,
color: 'black',
fontWeight: 'bold', 
textAlign: 'center',
marginTop: -270,
},
text1: {
fontSize: 18,
margin: 20,
color: 'black',
fontWeight: 'bold',
textAlign: 'center',
},
image: {
margin: -200,
marginBottom: 350,

width: 250,
opacity: 0.8,
height: 250,
},
button: {
    width: 200,
    height: 50,
    backgroundColor: 'black',
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },



});

