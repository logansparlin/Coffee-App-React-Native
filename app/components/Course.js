import colors from '../colors'
import SBXText from './common/SBXText'
import React, {
  Component,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native'

let {width, height} = Dimensions.get('window')

export default class Course extends Component {
  constructor(props) {
    super(props)

    this.toggleCourse = this.toggleCourse.bind(this)
  }

  toggleCourse() {
    this.props.toggleCourse(this.props.id)
  }

  render() {
    let {course, id} = this.props;
    return (
      <TouchableOpacity onPress={this.toggleCourse} activeOpacity={1} style={[styles.row, (id % 2 !== 0) ? styles.rowOdd : '']}>
        <View style={styles.checked}>
          <SBXText>0</SBXText>
        </View>
        <View style={styles.info}>
          <SBXText style={styles.title}>{course.title}</SBXText>
          <SBXText style={styles.description}>{course.description}</SBXText>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'column',
    borderTopWidth: 1,
    borderColor: '#333',
    flexDirection: 'row'
  },
  rowOdd: {
    // backgroundColor: '#eee'
  },
  checked: {
    width: 15,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    flex: 1
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
