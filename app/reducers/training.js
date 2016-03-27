import {
  SEND_INVITE
} from '../actions'

const initialState = {
  courses: [
    {
      title: "Seasonal Training",
      description: "Prepare for the spring promotion by elevating your iced offerings.",
      id: 1
    },
    {
      title: "Global Responsibility",
      description: "Learn more about our mission, values and guiding principles.",
      id: 2
    },
    {
      title: "Starbucks Brand",
      description: "Learn about Starbucks history and culture.",
      id: 3
    },
    {
      title: "Starbucks Coffee",
      description: "Learn about coffee growing, harvesting, and the fundamentals of brewing.",
      id: 4
    },
    {
      title: "Starbucks Espresso",
      description: "Learn about the perfect espresso shot and how to prepare espresso beverages.",
      id: 5
    },
    {
      title: "Seattle's Best History",
      description: "Learn about Seattle's Best Coffee history and culture.",
      id: 6
    },
    {
      title: "Seattle’s Best Coffee",
      description: "Learn about coffee growing, harvesting, and the fundamentals of brewing.",
      id: 7
    },
    {
      title: "Fontana® Blended Training",
      description: "Learn about making Fontana™ beverages.",
      id: 8
    },
    {
      title: "Tazo® Training",
      description: "Learn about the fundamentals of tea and how to craft Tazo® beverages.",
      id: 9
    }
  ],
  trainees: [
    {
      name: "Logan Sparlin",
      email: "lsparlin@marlinco.com",
      dateInvited: 1458672261025,
      progress: 1
    },
    {
      name: "Richard Browne",
      email: "rbrowne@marlinco.com",
      dateInvited: 1458672420079,
      progress: 0
    },
    {
      name: "John Doe",
      email: "jdoe@marlinco.com",
      dateInvited: 1458835415706,
      progress: 0.5
    },
    {
      name: "Juan Pablo",
      email: "jpablo@marlinco.com",
      dateInvited: 1458835428408,
      progress: 0.33
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
