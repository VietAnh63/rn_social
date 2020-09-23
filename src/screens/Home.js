import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Metrics, Fonts, Colors} from '../themes';
import Item from '../components/Item';
import CardView from '../components/CardView';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getall, getMe} from '../service/Api';
import {setMe, clearBook} from '../actions/authAction';
import {useSelector, useDispatch} from 'react-redux';

const initPagination = {limit: 5, skip: 0};
export default function Home({navigation}) {
  const dispatch = useDispatch();
  const [dataAPI, setDataAPI] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [pagination, setPagination] = useState(initPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  //set for ref component
  componentRef = {};

  React.useLayoutEffect(() => {
    dataAPI
      ? navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              style={{flexDirection: 'row', padding: Metrics.baseMargin}}
              name="right"
              size={25}
              //backgroundColor="orange"
              onPress={() => {
                componentRef.FlatList.scrollToOffset({
                  x: 0,
                  y: 0,
                  animated: true,
                });
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  fontWeight: 'normal',
                  paddingRight: Metrics.baseMargin,
                }}>
                Scroll Top
              </Text>
              <AntDesign name="upsquare" color="white" size={20} />
            </TouchableOpacity>
          ),
        })
      : null;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      const fetchData = async () => {
        try {
          const result = await getall({
            limit: pagination.limit,
            skip: pagination.skip,
          });
          setDataAPI(result.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      !isRefresh && fetchData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const getPosts = async () => {
      const result = await getall({
        limit: pagination.limit,
        skip: pagination.skip,
      });
      setDataAPI(result.data.data);
      setIsDelete(false);
    };
    setIsLoading(true);
    getPosts();
  }, [isDelete, pagination.limit, pagination.skip]);

  useEffect(() => {
    const fetchDataInfo = async () => {
      const result = await getMe();
      dispatch(setMe(result.data.data));
    };
    fetchDataInfo();
  }, []);

  renderItems = ({item}) => (
    <CardView style={{marginTop: Metrics.baseMargin}}>
      <Item title={item} onDelete={onDelete} />
    </CardView>
  );
  clearAll = () => {
    dispatch(clearBook());
  };

  const onRefresh = () => {
    setIsRefresh(true);
    const getPosts = async () => {
      const result = await getall(initPagination);
      setDataAPI(result.data.data);
      setIsRefresh(false);
    };
    getPosts();
  };

  const onDelete = () => {
    setIsDelete(true);
  };

  const handleLoadMore = () => {
    setCanLoadMore(true);
    if (canLoadMore) {
      setPagination({
        ...pagination,
        limit: pagination.limit + 3,
      });
    }
  };
  const footer = () => {
    if (!isLoading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator animating size="large" color="#0000ff" />
      </View>
    );
  };

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
        ref={(ref) => (componentRef.FlatList = ref)}
        data={dataAPI}
        ListHeaderComponent={header}
        renderItem={renderItems}
        keyExtractor={(item) => item._id}
        onRefresh={onRefresh}
        refreshing={isRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => setCanLoadMore(true)}
        ListFooterComponent={footer}
      />
    </View>
  );
}
