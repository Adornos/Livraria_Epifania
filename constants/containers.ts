import { StyleSheet } from 'react-native';
import C from './colors';

const Container = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: C.background,
    },
    submitButton: {
        backgroundColor: C.primaryButton,
        width: '100%',
        height: '100%',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Container;