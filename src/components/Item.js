import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Metrics, Fonts, Colors} from '../themes';
import {processImageUrl, processDate} from '../utils';
import FitImage from 'react-native-fit-image';
import {useSelector, useDispatch} from 'react-redux';
import {updatePost, deletePost, getMe} from '../service/Api';
import {bookMark, removeBook} from '../actions/authAction';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default function Item(props) {
  const [title, setTitle] = useState(props.title);
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const user = store.auth.me;
  const item_book = store.auth.book;
  const isLike = title.likes.includes(user._id);

  const onLike = async () => {
    const cloneTitle = {...title};
    const checkIncludeLike = cloneTitle.likes.includes(user._id);
    const newArrLike = checkIncludeLike
      ? cloneTitle.likes.filter((e) => e !== user._id)
      : cloneTitle.likes.concat([user._id]);

    try {
      const result = await updatePost({
        postId: title._id,
        like: user._id,
      });
      setTitle({...title, likes: newArrLike});
    } catch (error) {
      console.log('error', error);
    }
  };

  const idExists = (id) => {
    return item_book.some(function (el) {
      return el.id === id;
    });
  };

  const bookMark_handle = () => {
    const cloneTitle = {...title};
    const checkId = idExists(cloneTitle);

    if (!checkId) {
      dispatch(bookMark(cloneTitle));
      Alert.alert('Đã ghim bài');
    } else {
      Alert.alert('Đã ghim bài');
    }
  };

  const remove = () => {
    const cloneTitle = {...title};
    const id = cloneTitle._id;
    dispatch(removeBook(id));
    Alert.alert('Đã gỡ ghim bài viết');
  };

  const delete_post = async () => {
    if (user._id === title.user_id._id) {
      const result = await deletePost({ids: [title._id]});
      console.log(result);
      if (result.status === 200) {
        props.onDelete();
      }
    }
  };

  return (
    <View style={{marginTop: Metrics.baseMargin}}>
      <View style={{flexDirection: 'row', paddingTop: Metrics.baseMargin}}>
        {title.user_id.avatar_url ? (
          <Image
            source={{
              uri: processImageUrl(title.user_id.avatar_url),
            }}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50 / 2,
              marginRight: Metrics.baseMargin,
              borderWidth: 1,
              backgroundColor: 'green',
            }}
          />
        ) : (
          false
        )}

        <View>
          <Text
            style={{
              fontSize: Fonts.size.input,
              fontWeight: 'bold',
              color: '#1fd092',
            }}>
            {title.user_id.user_name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Entypo name="location" size={20} color={Colors.facebook}></Entypo>
            <Text
              style={{
                fontFamily: Fonts.style.h6.fontFamily,
                paddingLeft: Metrics.baseMargin,
                color: Colors.facebook,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {title.location}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: Metrics.baseMargin,
          fontFamily: Fonts.style.description.fontFamily,
          fontSize: Fonts.style.description.fontSize,
          color: '#F7F7F7',
          justifyContent: 'space-between',
        }}>
        <Text>{title.content}</Text>
        <TouchableOpacity style={{paddingRight: 0}}>
          <Menu>
            <MenuTrigger>
              <Entypo name="attachment" color="green" size={20} />
            </MenuTrigger>
            <MenuOptions style={{backgroundColor: '#009387'}}>
              <MenuOption onSelect={() => bookMark_handle()}>
                <Text style={{color: 'white'}}>Ghim bài viết</Text>
              </MenuOption>
              <MenuOption onSelect={() => remove()}>
                <Text style={{color: 'white'}}>Bỏ ghim bài viết</Text>
              </MenuOption>
              <MenuOption onSelect={() => delete_post()}>
                <Text style={{color: 'white'}}>Xóa bài viết</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center'}}>
        {props.title.image_url && props.title ? (
          <FitImage
            source={{
              uri: processImageUrl(title.image_url),
            }}
            style={{
              borderRadius: 10,
              maxHeight: 400,
              height: 350,
              width: '100%',
              resizeMode: 'contain',
            }}
          />
        ) : null}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: Metrics.baseMargin,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => onLike()}
            style={{flexDirection: 'row'}}>
            <AntDesign
              name={isLike ? 'like1' : 'like2'}
              size={30}
              color={isLike ? Colors.facebook : 'black'}
            />
            <Text
              style={{
                paddingLeft: Metrics.baseMargin,
                paddingTop: Metrics.baseMargin,
              }}>
              {title.likes.length}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'normal',
              fontFamily: Fonts.style.description.fontFamily,
              paddingTop: 6,
              backgroundColor: '#1fd092',
              color: 'white',
            }}>
            {processDate(title.updated_date)}
          </Text>
        </View>
      </View>
    </View>
  );
}
