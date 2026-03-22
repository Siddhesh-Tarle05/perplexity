import { useDispatch } from "react-redux";
import { register, login, getMe } from "../features/auth/services/auth.api";
import { setLoading, setUser, setError } from "../features/auth/auth.slice";

export function useAuth() {
    const dispatch = useDispatch();

    async function handleRegister({ email, username, password }) {
        try {
            dispatch(setLoading(true));

            const data = await register({ username, email, password });

            dispatch(setUser(data.user)); 
        } catch (error) {
            dispatch(
                setError(error.response?.data?.message || "Registration failed")
            );
        } finally {
            dispatch(setLoading(false)); 
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true));

            const data = await login({ email, password });
             console.log(data)
            dispatch(setUser(data.user));
        } catch (error) {
            dispatch(
                setError(error.response?.data?.message || "Login failed")
            );
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true));

            const data = await getMe();

            dispatch(setUser(data.user));
        } catch (error) {
            dispatch(
                setError(error.response?.data?.message || "Failed to fetch data")
            );
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleLogin, handleRegister, handleGetMe };
}