import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3c1518',
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#69140E',
        elevation: 8,
        borderRadius: 50,
        paddingVertical: 16,
        paddingHorizontal: 30,
        marginBottom: 10,
        alignSelf: 'stretch'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#a44200",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

export const typography = StyleSheet.create({
    header: {
        color: "#d58936",
        fontSize: 30,
        marginBottom: 36,
        fontWeight: "800",
        textTransform: "uppercase"
    },

    button: {
        color: "#f2f3ae",
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

    text: {
        color: "#f2f3ae",
        fontWeight: "500",
        fontSize: 14
    }
});
