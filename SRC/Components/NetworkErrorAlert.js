// import React, { useCallback, useMemo, useRef } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';
// import { windowHeight, windowWidth } from '../Utillity/utils';

// const NetworkErrorAlert = () => {
//   // ref
// //   const bottomSheetRef = useRef<BottomSheet>(null);

//   // variables
//   const snapPoints = useMemo(() => ['25%', '50%'], []);

//   // callbacks
//   const handleSheetChanges = useCallback((index) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   // renders
//   return (
//     <View style={styles.container}>
//       <BottomSheet
//         // ref={bottomSheetRef}
//         index={1}
//         snapPoints={snapPoints}
//         onChange={handleSheetChanges}
//         style={{
//             innerHeight : windowHeight * 0.3 ,
//             innerWidth : windowWidth , 
//             backgroundColor : 'red'
//         }}
//         containerHeight={windowHeight * 0.3}
//         containerStyle={{
//             height : windowHeight * 0.3 ,
//              backgroundColor : 'red'
//         }}
//       >
//         <View style={styles.contentContainer}>
//           <Text>Please Check your network connection 🎉</Text>
//         </View>
//       </BottomSheet>
//      </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: 'grey',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });

// export default NetworkErrorAlert;