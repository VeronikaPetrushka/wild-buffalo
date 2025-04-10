import { View } from "react-native"
import Learn from "../comp/Learn"

const LearnScreen = ( {route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Learn item={item} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default LearnScreen;