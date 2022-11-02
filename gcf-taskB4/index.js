const fetch = require("node-fetch");
/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.helloWorld = async (req, res) => {
    async function getAsianCurrencies(data) {
        const asianCurrencies = [
            "RUB",
            "AFN",
            "EUR",
            "AMD",
            "AZN",
            "BHD",
            "BDT",
            "BTN",
            "GBP",
            "BND",
            "KHR",
            "CNY",
            "AUD",
            "AUD",
            "EUR",
            "USD",
            "GEL",
            "HKD",
            "INR",
            "IDR",
            "IRR",
            "IQD",
            "ILS",
            "JPY",
            "JOD",
            "KZT",
            "KWD",
            "KGS",
            "LAK",
            "LBP",
            "MOP",
            "MYR",
            "MVR",
            "MNT",
            "MMK",
            "AMD",
            "NPR",
            "TRY",
            "KPW",
            "OMR",
            "PKR",
            "ILS",
            "PHP",
            "QAR",
            "RUB",
            "SAR",
            "SGD",
            "KRW",
            "RUB",
            "LKR",
            "SYP",
            "TWD",
            "TJS",
            "THB",
            "TRY",
            "TMT",
            "AED",
            "UZS",
            "VND",
            "YER",
        ];
        const arrayOfCurr = Object.entries(data.rates).map((e) => ({
            [e[0]]: e[1],
        }));
        const filteredList = arrayOfCurr.filter((x) =>
            asianCurrencies.includes(Object.keys(x)[0])
        );
        return filteredList;
    }

    return fetch("https://api.exchangerate.host/latest")
        .then((result) => result.json())
        .then((data) => getAsianCurrencies(data))
        .then((response) => res.status(200).send(response))
        .catch((error) => console.log("error", error));
};
