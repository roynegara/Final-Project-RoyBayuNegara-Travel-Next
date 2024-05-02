// sdh bener, REDUX untuk notif change avatar/profil image saja (syarat REDUX hehe)
const initialState = {
    notification: ''
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return {
                ...state,
                notification: action.payload
            };
        default:
            return state;
    }
};

export default rootReducer;
