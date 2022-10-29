var axios = require("axios");

var baseURL = "";

export const getHttpClient = () => {
    const httpClient = axios.create({
        baseURL: baseURL,
        timeout: 120000,
    });
    return httpClient;
};
