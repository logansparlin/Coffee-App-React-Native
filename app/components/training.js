import colors from '../colors'
import React, {
  Component,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ListView,
  StyleSheet
} from 'react-native'

let {width, height} = Dimensions.get('window')

export default class Training extends Component {

  constructor(props) {
    super(props)
    console.log(this.props)
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.trainees)
    }
  }

  renderRow(trainee, sectionId, rowId) {
    console.log(rowId)
    return (
      <View style={[styles.row, (rowId % 2 !== 0) ? styles.rowEven : {}]}>
        <Text>{trainee.name}</Text>
        <Text>{trainee.email}</Text>
      </View>
    )
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
  },
  input: {
    width: 250,
    height: 50,
    backgroundColor: '#eee',
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center'
  },
  row: {
    width: width,
    backgroundColor: 'white',
    padding: 20
  },
  rowEven: {
    backgroundColor: '#eee'
  }
})
