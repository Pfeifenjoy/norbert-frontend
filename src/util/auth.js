/**
 * @author Arwed Mett
 */
import UserStore from "../stores/UserStore";

/**
 * Check if the user is logged in.
 * This can be used as a guard for routes.
 */
export function requireAuth(nextState, replace) {
    if(!UserStore.authenticated) {
        replace({
            pathname: "/login",
            state: { nextPathname: nextState.location.pathname }
        });
    }
}
