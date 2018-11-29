import React from 'react';
import { View, Text } from 'react-native'
import ImageLoading from "../components/ImageLoading";
import colors from '../config/colors';

export default Product = (item) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: "flex-start" }}>
            <ImageLoading width={120} height={100} uri={item.image} />
            <Text
                style={{ fontSize: 14, fontWeight: 'bold', flex: 1, alignSelf: 'center', marginLeft: 8, marginRight: 8, color: colors.itemTitle }}
                numberOfLines={3} ellipsizeMode={"tail"}>{item.name}</Text>
        </View>
    )
}
