const initialState = {
    notification: '',
    accessToken:  null
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return {
                ...state,
                notification: action.payload
            };
        case 'SET_ACCESS_TOKEN': // Gabungkan kedua kasus di bawah ini menjadi satu dalam satu blok switch
            return {
                ...state,
                accessToken: action.payload
            };
        default:
            return state;
    }
};

export default rootReducer;


// sdh bener
// const initialState = {
//     notification: ''
// };

// const rootReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case 'SET_NOTIFICATION':
//             return {
//                 ...state,
//                 notification: action.payload
//             };
//         default:
//             return state;
//     }
// };

// export default rootReducer;
