import colors from '../colors'
import moment from 'moment'
import SBXText from './common/SBXText'
import TrainingRow from './TrainingRow'
import React, {
  Component,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ListView,
  Animated,
  Easing,
  StyleSheet
} from 'react-native'

let {width, height} = Dimensions.get('window')

export default class Training extends Component {

  constructor(props) {
    super(props)
    console.log(props)

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})

    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.trainees),
    }

    this.renderRow = this.renderRow.bind(this)
  }

  renderRow(trainee, sectionId, rowId) {
    return <TrainingRow courses={this.props.courses} trainee={trainee} rowId={rowId} />
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.trainees)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          ref="listView"
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})
