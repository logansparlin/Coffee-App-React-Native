import colors from '../colors'
import React, {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Component
} from 'react-native'

export class CloseIcon extends Component {
  render() {
    return (
      <TouchableOpacity style={[closeIcon.container, this.props.style]} onPress={this.props.onPress}>
        <View style={closeIcon.closeBar1}></View>
        <View style={closeIcon.closeBar2}></View>
      </TouchableOpacity>
    )
  }
}

const closeIcon = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2
  },
  closeBar1: {
    height: 15,
    width: 2,
    backgroundColor: 'white',
    position: 'absolute',
    left: 12,
    top: 5,
    transform: [{rotate: '45deg'}]
  },
  closeBar2: {
    height: 15,
    width: 2,
    backgroundColor: 'white',
    position: 'absolute',
    left: 12,
    top: 5,
    transform: [{rotate: '-45deg'}]
  }
})
