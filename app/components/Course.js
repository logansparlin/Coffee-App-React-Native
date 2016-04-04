import colors from '../colors'
import SBXText from './common/SBXText'
import _ from 'underscore'
import React, {
  Component,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native'

let {width, height} = Dimensions.get('window')

export default class Course extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false
    }
    this.toggleCourse = this.toggleCourse.bind(this)
  }

  toggleCourse() {
    this.setState({
      selected: !this.state.selected
    })
    this.props.toggleCourse(this.props.course.slug)
  }

  renderStatus() {
    if(this.state.selected) {
      return <Image style={styles.statusIcon} source={require("../../img/topic-checked.png")}/>
    } else {
      return <Image style={styles.statusIcon} source={require("../../img/topic-blank.png")} />
    }
  }

  render() {
    let {course, selectedCourses, id} = this.props;
    return (
      <TouchableOpacity onPress={this.toggleCourse} activeOpacity={1} style={[styles.row, (id % 2 !== 0) ? styles.rowOdd : '']}>
        <View style={styles.checked}>
          {this.renderStatus()}
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
    borderColor: '#ddd',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  rowOdd: {
    backgroundColor: 'white'
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
  statusIcon: {
    width: 25,
    height: 25
  },
  description: {
    flex: 3,
  }
})
