import axios from 'axios';

const useAxios = ({ method, url, data }) => {
    return axios({
        method: method, url: `${process.env.REACT_APP_SERVER_URL}${url}`, data, headers: {
            "authorization": localStorage.getItem("Auth_token")
        }
    })
        .then((res) => { return res; })
        .catch((err) => { throw err.response && err.response.data ? err.response.data.error : err; });
}

export default useAxios;