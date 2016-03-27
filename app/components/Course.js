import colors from '../colors'
import SBXText from './common/SBXText'
import React, {
  Component,
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native'

let {width, height} = Dimensions.get('window')

export default class Course extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {course, id} = this.props;
    return (
      <View style={[styles.row, (id % 2 !== 0) ? styles.rowOdd : '']}>
        <SBXText style={styles.title}>{course.title}</SBXText>
        <SBXText style={styles.description}>{course.description}</SBXText>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    width: width,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    flexDirection: 'column'
  },
  rowOdd: {
    backgroundColor: '#eee'
  },
  title: {
    flex: 1,
    fontSize: 18,
    paddingBottom: 5,
    fontWeight: '600',
    paddingRight: 10,
  },
  description: {
    flex: 3,
  }
})
