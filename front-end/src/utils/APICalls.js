import axios from 'axios';

export const getPosts = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/posts`);
        if (Array.isArray(res.data) && res.data?.length > 0) return { posts: res.data, status: res.status };
        throw new Error(`No posts found`);
    } catch (e) {
        return {
            posts: [],
            status: e.response?.status ?? 204,
            error: {
                type: `get`,
                message: `Data not available from the server: ${e.message ?? e.response.message}`
            }
        }
    }
}

export const addUser = async user => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL}/register`, user);
        return { user: res.data.user, status: res.status };
    }
    catch (e) {
        return {
            status: e.response?.status,
            error: {
                type: `post`,
                data: e.response?.data.error
            }
        };
    }
}

export const login = async user => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL}/login`, user);
        return { user: res.data.user, status: res.status };
    }
    catch (e) {
        return {
            status: e.response?.status,
            error: {
                type: `post`,
                data: e.response?.data.error
            }
        };
    }
}