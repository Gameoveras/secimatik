import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,FlatList } from 'react-native';
import Toast from 'react-native-toast-message'; // Kütüphaneyi ekledik
import ApiService from '../apis/api';


export default function Anket({ navigation, route }) {
  const [secimBilgisi, setSecimBilgisi] = useState({
    sehir: 'Istanbul',
    resmiPartiAdi: 'Parti A',
    adaylar: [],
    kategori: 'yerel',
    yil: '2024',
  });

  const [secilenAday, setSecilenAday] = useState(null);
  const [hasVoted, setHasVoted] = useState(false); // New state to track whether the user has voted
  const { selectedIl, selectedSex, selectedYas, selectedJob, selectedEducation, selectedIncome,ipAddress } = route.params;



  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const data = await ApiService.getSecimData(selectedIl);

       
        if (data.length === 0) {
          Toast.show({
            type: 'info',
            position: 'top',
            text1: 'Bilgi',
            text2: 'Bu şehirde henüz aday eklenmemiştir.',
          });
          return;
        }

        setSecimBilgisi({
          sehir: data[0].il,
          resmiPartiAdi: data[0].parti,
          adaylar: data.map(aday => ({
            ad_soyad: aday.ad_soyad,
            aday_resim_url: aday.aday_resim_url,
            parti: aday.parti,
            kategori: aday.kategori,
            yil: aday.yil,
          })) || [],
        });
      } catch (error) {
        console.error('Seçim bilgileri alınırken bir hata oluştu:', error);
      }
    };

    fetchData();
  }, [selectedIl]);

  const adaySecimiHandler = (aday) => {
    setSecilenAday(aday);
  };

  const oyVerHandler = async () => {
    if (!hasVoted && secilenAday) {
      try {
        const oyBilgileri = {
          il: selectedIl,
          parti: secilenAday.parti,
          aday_ismi: secilenAday.ad_soyad,
          kategori: secilenAday.kategori,
          yil: secilenAday.yil,
          yas: selectedYas,
          meslek: selectedJob,
          cinsiyet: selectedSex,
          egitim: selectedEducation,
          gelir: selectedIncome,
          ip: ipAddress,
        };

        await ApiService.oyVer(oyBilgileri);
        setHasVoted(true); 
        navigation.navigate('Sonuçlar', { selectedIl: selectedIl });
      } catch (error) {
        console.warn('Oy verme işlemi başarısız:', error.message);
      }
    } else if (hasVoted) {
      console.warn('Zaten oy kullandınız.');
    } else {
      console.warn('Lütfen oy vermeden önce bir aday seçin');
    }
  };


  const anaSayfaDonHandler = () => {
    navigation.navigate('Ana Sayfa');
  };

  const renderAday = ({ item }) => (
    <TouchableOpacity
      onPress={() => adaySecimiHandler(item)}
      style={[
        styles.candidate,
        secilenAday && secilenAday.ad_soyad === item.ad_soyad && styles.selectedCandidate,
      ]}
    >
      <Image source={{ uri: item.aday_resim_url }} style={styles.avatar} />
      <Text style={styles.adayName}>{item.ad_soyad}</Text>
      <Text style={styles.partiName}>{item.parti}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <FlatList
        data={secimBilgisi.adaylar}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderAday}
        ListHeaderComponent={() => (
          <Text style={styles.title}>{`${selectedIl} 2024 Yerel Seçim Adayları`}</Text>
        )}
        ListFooterComponent={() => (
          <>
            {secimBilgisi.adaylar.length > 0 && (
              <TouchableOpacity onPress={oyVerHandler} style={styles.voteButton}>
                <Text style={styles.buttonText}>Oy Ver</Text>
              </TouchableOpacity>
            )}
            {secimBilgisi.adaylar.length === 0 && (
              <TouchableOpacity onPress={anaSayfaDonHandler} style={styles.button}>
                <Text style={styles.buttonText}>Ana Sayfaya Geri Dön</Text>
              </TouchableOpacity>
            )}
          </>
        )}
        ListEmptyComponent={() => (
          <View style={styles.noCandidatesContainer}>
            <Text style={styles.noCandidatesText}>
              {`${selectedIl} ilinde henüz aday bulunamadı.`}
            </Text>
          </View>
        )}
      />
    </View>
  );
  
  
  
  

      }
  


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f2f2f2', 
    },
    title: {
      fontSize: 20, 
      fontWeight: 'bold',
      marginTop: 150,
      color: '#333', 
    },
    noCandidatesText: {
      fontSize: 16,
      textAlign: 'center',
      marginVertical: 20,
      color: '#999',
    },
    
    candidate: {
      borderWidth: 2, 
      borderColor: '#999', 
      padding: 15,
      marginVertical: 10,
      alignItems: 'center',
      borderRadius: 12, 
      backgroundColor: '#fff',
    },
    selectedCandidate: {
      backgroundColor: '#e0f7fa',
      borderColor: '#64b5f6', 
    },
    avatar: {
      width: 100, 
      height: 100, 
      borderRadius: 50, 
      marginBottom: 15, 
    },
    adayName: {
      fontWeight: 'bold',
      fontSize: 18, 
      color: '#333',
    },
    partiName: {
      color: '#666', 
    },
    voteButton: {
      backgroundColor: '#4caf50',
      padding: 18,
      marginTop: 20,
      borderRadius: 12,
      margin: 120,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    noCandidatesContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#b22222',
      padding: 15,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  