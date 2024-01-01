import { store } from "../core/store";
import Login from "../app/(auth)/login/page";

const withAuth = (Component) => {
    const Auth = () => {
        const accessToken = store.getState().user.accessToken;

        if (!accessToken) {
            return <Login />;
        }

        if (accessToken) {
            return <Component />;
        }
    };

    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
};

export default withAuth;
