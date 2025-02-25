export const redirectToHome = (next) => {
    next(false)
    window.location.pathname = '/app'
}
