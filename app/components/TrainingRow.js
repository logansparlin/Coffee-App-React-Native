import colors from '../colors'
import moment from 'moment'
import SBXText from './common/SBXText'
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

export default class TrainingRow extends Component {

  constructor(props) {
    super(props)

    this.state = {
      height: new Animated.Value(0),
      activeRow: null
    }

    this.toggleHeight = this.toggleHeight.bind(this)
  }

  toggleHeight() {

    Animated.timing(
      this.state.height,
      {
        toValue: (this.state.height._value == 0) ? 50 : 0,
        easing: Easing.easeInOut,
        duration: 150
      }
    ).start()
  }

  render() {

    let {trainee, rowId} = this.props

    function getAccess() {
      if(trainee.progress > 0) {
        return 'active'
      } else {
        return moment(trainee.DateInvited).format('M/D/YY')
      }
    }

    return (
      <View>
        <View style={[styles.row, (rowId % 2 !== 0) ? styles.rowEven : {}]}>
          <View style={styles.infoContainer}>
            <SBXText style={styles.access}>{getAccess()}</SBXText>
            <SBXText style={styles.name}>{trainee.TraineeName}</SBXText>
            <SBXText style={styles.email}>{trainee.TraineeEmail}</SBXText>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressOuter}>
              <View style={[styles.progressInner, {width: (trainee.PercentComplete * 100)}]}></View>
            </View>
          </View>
          <TouchableOpacity
            onPress={this.toggleHeight.bind(this, 'row' + rowId)}
            style={styles.arrowContainer}>
            <View style={[styles.bar, styles.barOne]} />
            <View style={[styles.bar, styles.barTwo]} />
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.buttonContainer, {height: this.state.height}]}>
          <TouchableOpacity style={[styles.button, styles.delete]}>
            <Text style={{color: 'white'}}>DELETE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.reInvite]}>
            <Text style={{color: 'white'}}>RE-INVITE</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    width: width,
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowEven: {
    backgroundColor: '#eee'
  },
  infoContainer: {
    flex: 2
  },
  progressContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  progressOuter: {
    width: 100,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#ddd',
    overflow: 'hidden'
  },
  progressInner: {
    height: 15,
    backgroundColor: colors.green
  },
  access: {
    fontWeight: '800',
    marginBottom: 10,
    fontSize: 12,
    color: '#888'
  },
  name: {
    fontWeight: '800'
  },
  email: {
    fontWeight: '800'
  },
  arrowContainer: {
    width: 30,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bar: {
    width: 2,
    height: 10,
    backgroundColor: '#333'
  },
  barOne: {
    position: 'relative',
    right: 2,
    transform: [{rotate: '-55deg'}]
  },
  barTwo: {
    position: 'relative',
    left: 3,
    transform: [{rotate: '55deg'}]
  },
  buttonContainer: {
    height: 0,
    overflow: 'hidden',
    width: width,
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  delete: {
    backgroundColor: '#333'
  },
  reInvite: {
    backgroundColor: colors.greenSecondary
  }
})
