import { StyleSheet, Dimensions, useColorScheme } from 'react-native';
import C from './colors';
import { SearchBar } from 'react-native-screens';

const Container = StyleSheet.create({
    
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: C.backgroundPrim,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollContainer:{
        flex: 1,
        backgroundColor: C.backgroundPrim,
        paddingVertical: 30,
    },
    submitButton: {
        backgroundColor: C.primaryButton,
        width: '100%',
        height: '100%',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    SearchBar:{
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: C.backgroundSec,
        borderRadius: 24,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 'auto',
    },
    homeContainer:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: C.backgroundPrim,
    },
    bookHorizontalContainer: {
    },

    bookCard: {
        padding: 8,
        backgroundColor: '#EDA72D',
        // marginEnd: 16,
    },

    bookImage: {
        width: 128,
        height: 184,
        resizeMode: 'cover',
    },

    footerContainer: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: C.backgroundSec,
        padding: 20,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderTopWidth: 1,
        borderTopColor: C.backgroundPrim,
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "space-between",
        alignItems: "center",
  },

  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.textPrim,
    borderRadius: 40,
    maxHeight: '20%',
    width: "90%",
    marginVertical: 10,
},
  cartImageContainer: {
    height: "100%",
    width: "35%",
    backgroundColor: C.textSec,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",

    borderBottomLeftRadius: 40,
    borderTopLeftRadius: 40,
  },
  cartImage: {
    // width: "100%",
    height: "100%",
  },
  cartDetailsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
    paddingRight: 30,
    height: "100%",
  },
  itemQuantityContainer: {
    width: '40%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: C.textSec,
  }

});

export default Container;