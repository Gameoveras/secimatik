import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView,ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import aketModel from '../models/aketmodel';
import axios from 'axios';
import ApiService from '../apis/api';


export default function Seçim( {navigation}) {
  const [anketModel, setAnketModel] = useState(new aketModel("", "", "", "", "", ""));
  const [selectedIl, setSelectedIl] = useState("");
  const [selectedSex, setSelectedSex] = useState("");
  const [selectedYas, setSelectedYas] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [selectedIncome, setSelectedIncome] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [oykullanici, setOykullanici] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // İlk olarak IP adresini al
        const response = await axios.get('https://api.ipify.org?format=json');
        const ip = response.data.ip;
        setIpAddress(ip);

        // Daha sonra alınan IP adresi ile diğer işlemleri gerçekleştir
        const ipDetails = await ApiService.GetIPAdress(ip);

        // Eğer kullanıcı oy kullanmışsa
        if (ipDetails.voted) {
          setOykullanici(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // useEffect'in bağımlılık dizisi boş, böylece sadece bir kere çağrılır


  const yolla = () => {
    if (isFormComplete) {
      
      const updatedAnketModel = new aketModel(
        selectedIl,
        selectedSex,
        selectedYas,
        selectedJob,
        selectedEducation,
        selectedIncome
      );
  
      setAnketModel(updatedAnketModel);
  

      navigation.navigate('Anket', { selectedIl: selectedIl, selectedSex: selectedSex, selectedYas: selectedYas, selectedJob: selectedJob, selectedEducation: selectedEducation, selectedIncome: selectedIncome,ipAddress: ipAddress});
    }else {
      console.warn('Lütfen tüm alanları doldurunuz.');
    }
  };
 
  const handleHomeButtonPress = () => {
    navigation.navigate('Seçim 2024');
  };
  const handleResultsButtonPress = () => {
    navigation.navigate('Sonuçlar', {selectedIl: selectedIl});
  };


  const sexList = ["Kadın", "Erkek", "Belirtmek İstemiyorum"];
  const yaslist = ["18-24", "25-34", "35-44", "45-54", "55-64", "65 ve Üzeri"];
  const educationList = [
    "İlkokul", "Ortaokul", "Lise", "Ön Lisans", "Lisans", "Yüksek Lisans", "Doktora", 
    ];
  const incomeList = [ "Asgari Ücret", "Asgari Ücret Altı", "20 Bin TL", "20-50 Bin TL", "50-100 Bin TL", "100-200 Bin TL", "200-500 Bin TL", "500 Bin TL Üzeri", "Belirtmek İstemiyorum", ];

  const jobList = ["Çalışmıyorum", "Öğrenciyim", "Emekliyim", "Ev Hanımıyım", "İşsizim", "Doktor", "Memur", "Avukat", "Pilot", "Akademisyen"," Mühendis", "Noter", "Diş Hekimi", "Mimar", "Polis","Öğretmen" , "Muhasebeci", "Bankacı", "Satış Temsilcisi",  "Müdür", "Yazar", "Psikolog", "Diyetisyen", "Siyasetçi", "Gazeteci" , "Diğer", "Belirtmek İstemiyorum", ];

  const cityList = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya",
    "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis",
    "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce",
    "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane",
    "Hakkari", "Hatay", "Iğdır", "Isparta", "İçel (Mersin)", "İstanbul", "İzmir", "Kahramanmaraş",
    "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli",
    "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir",
    "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Şanlıurfa",
    "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak",
  ];

  useEffect(() => {
    const isComplete =
      selectedIl !== "" &&
      selectedYas !== "" &&
      selectedJob !== "" &&
      selectedSex !== "" &&
      selectedEducation !== "" &&
      selectedIncome !== "";

    setIsFormComplete(isComplete);
  }, [selectedIl, selectedYas, selectedJob, selectedSex, selectedEducation, selectedIncome]);



  return (
    <SafeAreaView style={styles.container}>
       
      <ScrollView>
      {oykullanici ? (
        <View>
        <View style={styles.header}>
          <Text style={styles.heading}>Oy Kullanma Uyarısı</Text>
          <Text style={styles.warningText}>Daha önce oy kullandınız.</Text>
          <Button title="Anasayfaya Dön" style={styles.buttonhome} onPress={handleHomeButtonPress} />



        </View>
        <View style={styles.formContainer}>


          <Picker
            style={styles.picker}
            selectedValue={selectedIl}
            onValueChange={(value) => setSelectedIl(value)}
          >
            <Picker.Item label="İl Seçiniz" value="" />
            {cityList.map((city, index) => (
              <Picker.Item key={index} label={city} value={city} />
            ))}
          </Picker>
          <View style={styles.formContainer}>
          <TouchableOpacity style={styles.buttoncheck} onPress={handleResultsButtonPress}>
            <Text style={styles.buttonText1}>Anket Sonuçlarını Görüntüle</Text>
          </TouchableOpacity>

</View>

         

        </View>
        </View>
        ) : (
        <View>
        <View style={styles.header}>
           


          <Text style={styles.heading}>Ankete Katıl</Text>

        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formInstructions}>
            Ankete katılmak için gerekli bilgileri doldur:
          </Text>

          <Picker
            style={styles.picker}
            selectedValue={selectedIl}
            onValueChange={(value) => setSelectedIl(value)}
          >

            <Picker.Item label="İl Seçiniz" value="" />
            {cityList.map((city, index) => (
              <Picker.Item key={index} label={city} value={city} />
            ))}
          </Picker>
            <Picker
            style={styles.picker}
            selectedValue={selectedYas}
            onValueChange={(value) => setSelectedYas(value)}
            >
            <Picker.Item label="Yaş Seçiniz" value="" />
            {yaslist.map((yas, index) => (
              <Picker.Item key={index} label={yas} value={yas} />
            ))}
            </Picker>
            <Picker
            style={styles.picker}
            selectedValue={selectedJob}
            onValueChange={(value) => setSelectedJob(value)}
            >
            <Picker.Item label="Mesleğinizi Seçiniz" value="" />
            {jobList.map((job, index) => (
              <Picker.Item key={index} label={job} value={job} />
            ))}
            </Picker>




          <Picker
            style={styles.picker}
            selectedValue={selectedSex}
            onValueChange={(value) => setSelectedSex(value)}
          >
            <Picker.Item label="Cinsiyet Seçiniz" value="" />
            {sexList.map((sex, index) => (
              <Picker.Item key={index} label={sex} value={sex} />
            ))}
          </Picker>

            <Picker
            style={styles.picker}
            selectedValue={selectedEducation}
            onValueChange={(value) => setSelectedEducation(value)}
            >
            <Picker.Item label="Eğitim Durumunuzu Seçiniz" value="" />
            {educationList.map((education, index) => (
              <Picker.Item key={index} label={education} value={education} />
            ))}
            </Picker>

            <Picker
            style={styles.picker}
            selectedValue={selectedIncome}
            onValueChange={(value) => setSelectedIncome(value)}
            >
            <Picker.Item label="Aylık Gelirinizi Seçiniz" value="" />
            {incomeList.map((income, index) => (
                <Picker.Item key={index} label={income} value={income} />
                ))}
            </Picker>


                

            <TouchableOpacity
            style={[styles.button, isFormComplete ? styles.activeButton : styles.disabledButton]}
            onPress={yolla}
            disabled={!isFormComplete}
          >
            <Text style={styles.buttonText}>Ankete Başla</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  buttoncheck: {
    width: 300,
    height: 40,
    backgroundColor: 'black',
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    marginBottom: 20,
  },
  
  warningText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  buttons: {
    width: 150,
    height: 40,
    backgroundColor: 'black',
    marginTop: -20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 250,
    marginBottom: 20,
  },
  activeButton: {
    backgroundColor: '#007bff',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#b22222',
    padding: 10,


  },
  buttonhome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#b22222',
    padding: 10,
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  formContainer: {
    padding: 20,
    marginTop: 20,
  },
  formInstructions: {
    borderRadius: 35,
    fontSize: 14,
    padding: 10,

    color: 'white',
    backgroundColor: '#b22222',
    marginBottom: 25,
    marginLeft: 10,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#b22222',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
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
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
});
