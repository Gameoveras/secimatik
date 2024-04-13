import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import ApiService from '../apis/api';

const Sonuc = ({ navigation, route }) => {
  const [oyDagilimi, setOyDagilimi] = useState([]);
  const { selectedIl } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiService.getOyDagilimi(selectedIl);
        if (data.length === 0) {
          setError('Belirtilen il için sonuç bulunamadı.');
        } else {
          const totalVotes = data.reduce((total, item) => total + item.oy_sayisi, 0);

          const dataWithPercentages = data.map(item => ({
            ...item,
            oy_orani: (item.oy_sayisi / totalVotes) * 100,
          }));
          setOyDagilimi(dataWithPercentages);
        }
      } catch (error) {
        setError('Oy dağılımı alınırken bir hata oluştu.');
        console.error('Oy dağılımı alınırken bir hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedIl]);

  const anaSayfaDonHandler = () => {
    navigation.navigate('Seçim 2024');
  };



  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sonuçlar Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{error}</Text>
        <TouchableOpacity onPress={anaSayfaDonHandler} style={styles.button}>
          <Text style={styles.buttonText}>Ana Sayfaya Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={anaSayfaDonHandler} style={styles.button}>
        <Text style={styles.buttonText}>Ana Sayfaya Dön</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Oy Dağılımı</Text>
      {oyDagilimi.length > 0 ? (
        <>
          <BarChart
            style={styles.chart}
            data={{
              labels: oyDagilimi.map(item => item.aday_ismi),
              datasets: [
                {
                  data: oyDagilimi.map(item => item.oy_orani),
                },
              ],
            }}
            width={350}
            height={220}
            chartConfig={{
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="value"
            backgroundColor="transparent"
            absolute
            hasLegend={false}
          />

        
          <View style={styles.voteContainer}>
            {oyDagilimi.map((item, index) => (
              <Text key={index} style={styles.voteText}>
                {item.aday_ismi}: {item.oy_sayisi} Oy
              </Text>
            ))}
          </View>
        </>
      ) : (
        <Text style={styles.title}>Belirtilen il için sonuç bulunamadı.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    marginVertical: 8,
    borderRadius: 16,

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  voteContainer: {
    marginTop: 20,
  },
  voteText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
});

export default Sonuc;
