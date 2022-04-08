// import useSWR from 'swr';
import useSWR from 'swr';
import api from '../services/api';

const get = (url) => {
    const { data, error } = useSWR(url, async url => {
        try {
            let { data } = await api.get(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    });
    return { data, error, isFetching: !data && !error };
}

const post = async (url, config = {}) => {
    try {
        let { data } = await api.post(url, config.data);
        return { data };
    } catch (error) {
        console.error(error);
        return { error };
    }
}

const useFetch = {
    get,
    post,
}

export { useFetch };