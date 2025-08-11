import {
    StyleSheet
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Modal from 'react-native-modal';
import { View } from 'native-base';

const QuerySheet = ({
    refRBSheet,
    setRef
}) => {
    console.log('yahaaa per h')
    return (
        <Modal
            isVisible={refRBSheet}
            onBackdropPress={() => {
                setRef(false);
            }}>
            <View style={{
                width: windowWidth,
                height: windowHeight * 0.5,
                backgroundColor: "red"
            }}
            >

            </View>
        </Modal>
    );
};

export default QuerySheet;

const styles = StyleSheet.create({
    icon: {
        marginHorizontal: moderateScale(10, 0.3),
    },
    Text: {
        fontSize: 18,
        textAlign: 'center',
        paddingTop: moderateScale(30, 0.3),
    },
    input: {
        backgroundColor: Color.lightGrey,
        width: windowWidth * 0.9,
        height: windowHeight * 0.16,
        marginVertical: moderateScale(20, 0.3),
        borderRadius: moderateScale(15, 0.3),
        paddingHorizontal: moderateScale(20, 0.3),
    },
    btnText: {
        color: Color.white,
        fontSize: moderateScale(17, 0.3),
    },
});
