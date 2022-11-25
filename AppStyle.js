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
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#69140E',
        elevation: 8,
        borderRadius: 50,
        paddingVertical: 16,
        paddingHorizontal: 30,
        marginVertical: 10,
        alignSelf: 'stretch'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 12,
        backgroundColor: "#3c1518",
        borderRadius: 20,
        borderWidth: 4,
        borderColor: "#69140e",
        padding: 40,
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
    input: {
        color: "#f2f3ae",
        backgroundColor: '#3c1518',
        height: 64,
        marginBottom: 12,
        borderWidth: 5,
        borderColor: "#69140e",
        padding: 10,
        borderRadius: 50,
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        fontWeight: "800",
        fontSize: 18,
        textAlign: "center"
    },
    barStyle: {
        color: 'white'
    }
});

export const typography = StyleSheet.create({
    header: {
        color: "#d58936",
        fontSize: 40,
        marginBottom: 36,
        fontWeight: "800",
        fontStyle:"italic",
        textTransform: "uppercase"
    },

    button: {
        color: "#f2f3ae",
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

    header2: {
        color: "#f2f3ae",
        marginBottom: 20,
        fontWeight: "700",
        fontSize: 28
    },

    text2: {
        color: "#f2f3ae",
        fontWeight: "500",
        fontSize: 18
    }
});
