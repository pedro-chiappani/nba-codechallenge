// import React, {useEffect, useState} from 'react'
// import {changeIcon, getIcon} from 'react-native-change-icon';
// import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList, Image} from 'react-native';

// import { appIconList } from '../assets/iconList';


// const IconScreen = () => {
//   const [activeLogo, setActiveLogo] = useState('Default');

//   const onSelectLogo = async () => {
//     try {
//       console.log(`logo: ${ activeLogo }`)
//       const response = await changeIcon(activeLogo);
//       console.log(response)
//     } catch (error) {
//       console.log(`${error}`);
//     }
//   };

//   useEffect(() => {
//     const getCurrentIcon = async () => {
//       const currentIcon = await getIcon();
//       console.log(`current icon: ${currentIcon}`)
//       setActiveLogo(currentIcon === 'iclauncher' ? 'iclauncher' : currentIcon);
//     };
//     getCurrentIcon();
//   }, []);

//   const renderCell = (item, index) => {
//     return (
//       <TouchableOpacity
//         activeOpacity={0.8}
//         style={[
//           styles.cellContainer,
//           {backgroundColor: item?.id % 2 ? '#F6F0E7' : '#EEEDE7'},
//         ]}
//         onPress={() => setActiveLogo(item?.label)}>
//         <Image source={item?.img} style={styles.logoContainer} />
//         <View style={styles.labelContainer}>
//           <Text style={styles.labelText}>{item?.label}</Text>
//         </View>
//         <View style={styles.radioButtonSection}>
//           <View style={styles.radioButtonOuterContainer}>
//             <View
//               style={[
//                 styles.radioButtonInnerContainer,
//                 {
//                   backgroundColor:
//                     item?.label === activeLogo ? '#019688' : 'transparent',
//                 },
//               ]}></View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };
  
//   return (
//     <SafeAreaView style={styles.safeAreaContainer}>
//       <View style={styles.rootContainer}>
//         <FlatList
//           data={appIconList}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({item, index}) => renderCell(item, index)}
//         />

//         <TouchableOpacity
//           activeOpacity={0.7}
//           style={styles.buttonContainer}
//           onPress={() => onSelectLogo()}>
//           <Text style={styles.buttonLabel}>Set as app icon</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeAreaContainer: {
//     flex: 1,
//     width: '100%',
//   },
//   rootContainer: {
//     flex: 1,
//     width: '100%',
//     backgroundColor: '#fafafa',
//     padding: 8,
//   },
//   cellContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#EEEDE7',
//     elevation: 5,
//     marginVertical: 6,
//     padding: 6,
//     marginHorizontal: 6,
//   },
//   logoContainer: {
//     height: 60,
//     width: 60,
//     resizeMode: 'contain',
//   },
//   labelContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 12,
//   },
//   labelText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   radioButtonSection: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 6,
//   },
//   radioButtonOuterContainer: {
//     height: 20,
//     width: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#656565',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   radioButtonInnerContainer: {
//     height: 12,
//     width: 12,
//     borderRadius: 6,
//   },
//   buttonContainer: {
//     height: 45,
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ae3251',
//     elevation: 5,
//   },
//   buttonLabel: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {changeIcon, getIcon} from 'react-native-change-icon';
import { appIconList } from '../assets/iconList';

const IconScreen = () => {
  const [currentIcon, setCurrentIcon] = useState('Default');
  const changeAppIcon = async name => {
    try {
      console.log(`${name}`)
      const response = changeIcon(name);
      console.log(response)
      setCurrentIcon(response);
    } catch (err) {console.log(err)}
  };

  useEffect(() => {
    const getCurrentIcon = async () => {
      const currentIcon = await getIcon();
      setCurrentIcon(currentIcon);
    };
    getCurrentIcon();
  }, []);

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Select your App Icon</Text>
      </View>
      <View style={styles.iconContainer}>
        {appIconList.map(icon => {
          const isSelected = icon.iconName === currentIcon;
          return (
            <TouchableWithoutFeedback
              key={icon.id}
              onPress={() => {
                changeAppIcon(icon.label);
              }}>
              <View
                style={[
                  styles.iconView,
                  {
                    backgroundColor: isSelected ? 'lightgray' : 'transparent',
                  },
                ]}>
                <Image style={styles.icon} source={icon.img} />
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
      <Text>Icono Actual : {currentIcon}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  headingContainer: {padding: 8, marginTop: 20},
  heading: {
    fontWeight: '500',
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  iconView: {
    borderRadius: 10,
    margin: 4,
  },
  icon: {
    height: 100,
    borderRadius: 10,
    width: 100,
    margin: 8,
  },
});


export default IconScreen

