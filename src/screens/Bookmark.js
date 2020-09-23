import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, Button} from 'react-native';
import {Metrics, Fonts, Colors} from '../themes';
import Item from '../components/Item';
import CardView from '../components/CardView';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {clearBook} from '../actions/authAction';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getall} from '../service/Api';

export default function Bookmark({navigation}) {
  const [dataAPI, setDataAPI] = useState([]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{flexDirection: 'row', padding: Metrics.baseMargin}}
          name="right"
          size={25}
          onPress={() => clearStore()}>
          <Text
            style={{
              fontSize: 18,
              color: 'white',
              fontWeight: 'normal',
              paddingRight: Metrics.baseMargin,
            }}>
            Remove
          </Text>
          <FontAwesome5 name="trash-alt" color="white" size={18} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      const fetchData = async () => {
        try {
          const result = await getall();
          console.log('result day ne', result);
          setDataAPI(result.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [dataAPI, navigation]);

  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const item = store.auth.book;

  const item_fill = dataAPI.filter((val) =>
    item.find((x) => val._id === x._id),
  );

  const renderItems = ({item}) => (
    <CardView style={{marginTop: Metrics.baseMargin}}>
      <Item title={item} />
    </CardView>
  );
  const clearStore = () => {
    dispatch(clearBook());
  };
  return (
    <View
      style={{marginTop: Metrics.baseMargin, backgroundColor: Colors.frost}}>
      <FlatList
        data={item_fill}
        renderItem={renderItems}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
