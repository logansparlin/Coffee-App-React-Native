import {
  SEND_INVITE
} from '../actions'

const initialState = {
  courses: [],
  trainees: [
    {
      name: "Logan Sparlin",
      email: "lsparlin@gmail.com",
      dateInvited: 1458672261025
    },
    {
      name: "Richard Browne",
      email: "rbrowne@gmail.com",
      dateInvited: 1458672420079
    }
  ]
}



export default function training(state = initialState, action) {
    switch(action.type) {
      case SEND_INVITE:
        return Object.assign({}, state, {
          courses: state.courses,
          trainees: [...state.trainees, action.invite]
        })
      default:
        return state
    }
}
