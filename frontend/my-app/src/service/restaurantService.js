import axios from "axios";
import { API_LINK } from "../common/constants";

const getAll = async () => {
    const request = axios.get(`${API_LINK}/restaurants/`);
    return request
};

const create = (newObject) => {
    const request = axios.post(`${API_LINK}/restaurants/`, newObject);
    return request.then((response) => response.data);
};

const update = (id, newObject) => {
    const response = axios.put(`${API_LINK}/restaurants/${id}`, newObject);
    return response.then((response) => response.data);
};

const deleteRes = (id) => {
    const request = axios.delete(`${API_LINK}/restaurants/${id}`);
    return request.then((response) => response.data);
};

const exports = { getAll, create, deleteRes, update};

export default exports;
