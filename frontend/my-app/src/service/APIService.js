import { getHttpClient } from "./httpClient";

class APIService {
    static get = (url, callbackFn) => {
        getHttpClient()
            .get(url)
            .then(
                (response) => {
                    callbackFn(null, response.data);
                },
                (error) => {
                    console.log(error);
                    callbackFn(error, null);
                }
            );
    };
}

export default APIService;
