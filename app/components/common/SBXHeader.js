import { Actions } from 'react-native-router-flux'
import colors from '../../colors'
import React, {
  Component,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'

let {width, height} = Dimensions.get('window')


export default class SBXHeader extends Component {

  back() {
    Actions.pop()
  }

  render() {
    return (
      <View style={[styles.headerBar, {backgroundColor: this.props.backgroundColor || colors.green}]}>
        <Text style={styles.title}>{this.props.title}</Text>
        {(this.props.closeIcon)
          ? <TouchableOpacity onPress={this.back} style={styles.closeIcon}>
              <View style={styles.barOne} />
              <View style={styles.barTwo} />
            </TouchableOpacity>
          : <Text></Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: 64,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  title: {
    fontFamily: 'Avenir',
    fontWeight: '600',
    letterSpacing: 1.2,
    fontSize: 16,
    color: 'white',
    marginBottom: 7
  },
  closeIcon: {
    position: 'absolute',
    width: 30,
    height: 25,
    right: 20,
    bottom: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barOne: {
    position: 'relative',
    left: 4,
    width: 10,
    height: 2,
    backgroundColor: 'white',
    transform: [{rotate: '-30deg'}]
  },
  barTwo: {
    position: 'relative',
    bottom: 2,
    right: 4,
    width: 10,
    height: 2,
    backgroundColor: 'white',
    transform: [{rotate: '30deg'}]
  }
})
