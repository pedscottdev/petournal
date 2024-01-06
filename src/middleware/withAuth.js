import { store } from "../core/store";
import Login from "../app/(auth)/login/page";
import { useRouter } from "next/navigation";


const withAuth = (Component) => {
    const Auth = () => {
        
        const accessToken = store.getState().user.accessToken;

        const {push} = useRouter();

        if (!accessToken) {
            push("/login")
        }

        if (accessToken) {
            return <Component />;
        }
    };


    return Auth;
};

export default withAuth;
