import {
  SEND_INVITE,
  REQUEST_TRAINEES,
  RECEIVE_TRAINEES
} from '../actions'

const courses = [
  {
    title: "Seasonal Training",
    description: "Prepare for the spring promotion by elevating your iced offerings."
  },
  {
    title: "Global Responsibility",
    description: "Learn more about our mission, values and guiding principles."
  },
  {
    title: "Starbucks Brand",
    description: "Learn about Starbucks history and culture."
  },
  {
    title: "Starbucks Coffee",
    description: "Learn about coffee growing, harvesting, and the fundamentals of brewing."
  },
  {
    title: "Starbucks Espresso",
    description: "Learn about the perfect espresso shot and how to prepare espresso beverages."
  },
  {
    title: "Seattle's Best History",
    description: "Learn about Seattle's Best Coffee history and culture."
  },
  {
    title: "Seattle's Best Coffee",
    description: "Learn about coffee growing, harvesting, and the fundamentals of brewing."
  },
  {
    title: "Fontana® Blended Training",
    description: "Learn about making Fontana™ beverages."
  },
  {
    title: "Tazo® Training",
    description: "Learn about the fundamentals of tea and how to craft Tazo® beverages."
  }
]

const initialState = {
  isFetching: false,
  courses: courses,
  trainees: []
}



export default function training(state = initialState, action) {
    switch(action.type) {
      case REQUEST_TRAINEES:
        return Object.assign({}, state, {
          isFetching: true
        })
      case RECEIVE_TRAINEES:
        return Object.assign({}, state, {
          isFetching: false,
          trainees: action.trainees
        })
      case SEND_INVITE:
        return Object.assign({}, state, {
          trainees: [...state.trainees, action.invite]
        })
      default:
        return state
    }
}
