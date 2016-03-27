import { connect } from 'react-redux'
import { sendInvite } from '../actions'
import SBXHeader from '../components/common/SBXHeader'
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
      name: "Logan Sparlin",
      email: "lsparlin@marlinco.com",
      progress: 0
    }

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})

    this.state = {
      courses: this.ds.cloneWithRows(this.props.courses),
    }

    this.updateName = this.updateName.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.submit = this.submit.bind(this)
  }

  updateName(e) {
    this.fields.name = e.nativeEvent.text
  }

  updateEmail(e) {
    this.fields.email = e.nativeEvent.text
  }

  submit() {
    this.props.sendInvite(this.fields)
  }

  renderRow(course, sectionId, rowId) {
    return <Course course={course} id={rowId} />
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container}>
          <ListView
            contentContainerStyle={styles.courses}
            dataSource={this.state.courses}
            renderRow={this.renderRow} />
          <TextInput style={styles.input}
            autoCapitalize='words'
            autoCorrect={false}
            placeholder="name"
            returnKeyType='done'
            onChange={this.updateName} />
          <TextInput style={styles.input}
            clearButtonMode='while-editing'
            autoCapitalize='none'
            keyboardType="email-address"
            autoCorrect={false}
            placeholder="email"
            returnKeyType='done'
            onChange={this.updateEmail} />
          <TouchableOpacity onPress={this.submit}>
            <Text>SUBMIT</Text>
          </TouchableOpacity>
        </ScrollView>
        <SBXHeader
          title="NEW INVITE"
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  courses: {
    marginTop: 64,
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  input: {
    width: 250,
    height: 50,
    backgroundColor: '#eee',
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center'
  }
})
