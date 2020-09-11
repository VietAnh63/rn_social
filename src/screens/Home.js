import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, Button} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Metrics, Fonts, Colors} from '../themes';
import Item from '../components/Item';
import CardView from '../components/CardView';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getall} from '../service/Api';
const data = Array(10)
  .fill('')
  .map((e, i) => ({
    id: i + 1,
    content: 'zzz',
    username: 'admin',
    image: '../images/image.jpg',
    date: '1/1/2011',
  }));

export default function Home({navigation}) {
  const [dataAPI, setDataAPI] = useState([]);

  const fetchData = async () => {
    try {
      const result = await getall();
      setDataAPI(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  renderItems = ({item}) => (
    <CardView style={{marginTop: Metrics.baseMargin}}>
      <Item title={item} />
    </CardView>
  );

  header = () => {
    return (
      <CardView style={{paddingTop: Metrics.baseMargin + 3}}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 0.2,
              padding: Metrics.baseMargin,
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                navigation.navigate('CreatePost');
              }}>
              <Image
                source={require('../images/anhpv.jpg')}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50 / 2,
                  marginRight: Metrics.baseMargin,
                  borderWidth: 0.3,
                  backgroundColor: 'green',
                }}
              />
              <Text style={{alignSelf: 'center'}}>What's in your mind?</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: Metrics.baseMargin,
            }}>
            <AntDesign name="instagram" size={30} color={Colors.facebook} />
            <Text style={{paddingLeft: Metrics.baseMargin}}>Photo</Text>
          </View>
        </View>
      </CardView>
    );
  };

  return (
    <View
      style={{marginTop: Metrics.baseMargin, backgroundColor: Colors.frost}}>
      <FlatList
        data={dataAPI}
        ListHeaderComponent={header}
        renderItem={renderItems}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
