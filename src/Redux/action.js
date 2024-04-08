export const setLoggedUser = (user) => ({
    type: 'SET_LOGGED_IN_USER',
    payload: user,
})

export const setAuthStatus = (status) => ({
    type: 'SET_AUTH_STATUS',
    payload: status,
})
