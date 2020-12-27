const INITIAL_STATE = {
    list: []
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'BILLING_CYCLES_FETCHED':
            return {
                ...state,
                list: action.payload.data
            }
        // case 'BILLING_CYCLES_CREATE':
        //     return {
        //         ...state,
        //         list: action.payload.data
        //     }
        default:
            return state
    }
}