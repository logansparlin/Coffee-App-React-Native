import { connect } from 'react-redux'
import { sendInvite } from '../actions'
import SBXHeader from '../components/common/SBXHeader'
import SBXText from '../components/common/SBXText'
import Course from './Course'
import colors from '../colors'
import React, {
  Component,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ListView,
  ScrollView,
  StyleSheet
} from 'react-native'

let {width, height} = Dimensions.get('window')

class NewInvite extends Component {

  constructor(props) {
    super(props)

    this.fields = {
      TraineeName: "Logan Sparlin",
      TraineeEmail: "lsparlin@marlinco.com",
      progress: 0
    }

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})

    this.state = {
      courses: this.ds.cloneWithRows(this.props.courses),
      selectedCourses: []
    }

    this.updateName = this.updateName.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.submit = this.submit.bind(this)
    this.toggleCourse = this.toggleCourse.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  updateName(e) {
    this.fields.TraineeName = e.nativeEvent.text
  }

  updateEmail(e) {
    this.fields.TraineeEmail = e.nativeEvent.text
  }

  submit() {
    this.props.sendInvite(this.fields)
  }

  toggleCourse(id) {
    let {selectedCourses} = this.state;
    let index = selectedCourses.indexOf(id)
    if(index !== -1) {
      this.setState({
        selectedCourses: [
          ...selectedCourses.slice(0, index),
          ...selectedCourses.slice(index + 1)
        ]
      })
    } else {
      this.setState({
        selectedCourses: [
          ...this.state.selectedCourses,
          id
        ]
      })
    }
  }

  renderRow(course, sectionId, rowId) {
    console.log(this)
    return <Course toggleCourse={this.toggleCourse} course={course} id={rowId} />
  }

  render() {
    console.log(this.state.selectedCourses)
    return (
      <View style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps={true} contentContainerStyle={styles.container} keyboardDismissMode="on-drag">
          <View style={styles.form}>
            <TextInput style={styles.input}
              autoCapitalize='words'
              autoCorrect={false}
              placeholder="Trainee Name"
              placeholderTextColor="#666"
              returnKeyType='done'
              onChange={this.updateName} />
            <TextInput style={styles.input}
              clearButtonMode='while-editing'
              autoCapitalize='none'
              keyboardType="email-address"
              autoCorrect={false}
              placeholder="Trainee Email"
              placeholderTextColor="#666"
              returnKeyType='done'
              onChange={this.updateEmail} />
          </View>
          <ListView
            contentContainerStyle={styles.courses}
            dataSource={this.state.courses}
            renderRow={this.renderRow} />
        </ScrollView>
        <TouchableOpacity activeOpacity={0.8} style={styles.submit} onPress={this.submit}>
          <SBXText style={styles.submitText}>SEND INVITE</SBXText>
        </TouchableOpacity>
        <SBXHeader
          title="COURSE BUILDER"
          closeIcon={true}
          />
      </View>
    )
  }

}

function mapStateToProps(state) {
  return {
    courses: state.training.courses,
    trainees: state.training.trainees
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendInvite: (invite) => {
      dispatch(sendInvite(invite))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewInvite)

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    paddingBottom: 64,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  courses: {
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  input: {
    width: (width / 2) - 15,
    height: 50,
    // borderWidth: 1,
    // borderRadius: 5,
    borderColor: "white",
    backgroundColor: "#ddd",
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center'
  },
  submit: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 60,
    backgroundColor: colors.greenSecondary,
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitText: {
    color: 'white',
    fontWeight: '800',
    letterSpacing: 1
  }
})
