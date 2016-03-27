import React, {
  Text,
  Component,
  StyleSheet
} from 'react-native'

export default class SBXText extends Component {
  render() {
    return (
      <Text style={[styles.text, this.props.style]}>{this.props.children}</Text>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Avenir'
  }
})
