import { logout } from "../features/user/userApiSlice"

export const apiFetch = async (dispatch, url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token")

    if (!token) throw new Error("No Auth token found.")

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })

    if (response.status === 401 || response.status === 403) {
        dispatch(logout())
        throw new Error("Unauthorized")
    }

    return response
}
