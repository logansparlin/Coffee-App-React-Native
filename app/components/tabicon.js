import React, {Text, View, Component, Dimensions, StyleSheet} from 'react-native'
import colors from '../colors'

let {width, height} = Dimensions.get('window')

export default class TabIcon extends React.Component {
    render(){
        return (
            <View style={[ styles.container, {backgroundColor: this.props.selected ? colors.darkGrey : '#aaa'}]}>
              <Text style={styles.text}>{this.props.title.toUpperCase()}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    width: (width / 3),
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
  },
  text: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    letterSpacing: 1.2,
    fontSize: 10,
    color: 'white'
  }
})
