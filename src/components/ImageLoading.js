import React from 'react'
import { View, Image, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'
import colors from '../config/colors';

class ImageLoading extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showLoading: !this.props.isLocal,
            showPlaceholder: true
        }
    }

    render() {
        const source = this.props.isLocal ? this.props.placeholder : { uri: this.props.uri }
        return (
            <View style={{ justifyContent: 'center' }}>
                <FastImage
                    style={{ width: this.props.width, height: this.props.height }} source={source}
                    resizeMode={FastImage.resizeMode.contain}
                    onLoad={() => { this.setState({ showLoading: false, showPlaceholder: false }) }}
                    onError={() => { this.setState({ showLoading: false, showPlaceholder: true }) }} />
                {this.state.showPlaceholder && (
                    <Image
                        style={{ width: this.props.width, height: this.props.height, position: 'absolute' }}
                        source={this.props.placeholder} />
                )}
                {this.state.showLoading && (
                    <View style={{ width: this.props.width, height: this.props.height, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator style={{ alignSelf: 'center' }} size={'small'} color={colors.primary} indeterminate />
                    </View>
                )}
            </View>
        )
    }
}

ImageLoading.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    placeholder: PropTypes.number,
    uri: PropTypes.string.isRequired,
}

ImageLoading.defaultProps = {
    placeholder: require('../assets/placeholder_image.png'),
    isLocal: false
}

export default ImageLoading
