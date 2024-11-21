import axios from "axios";

const baseUrl = "https://dummyjson.com"
const timeoutMsg = "Waiting for too long....Request aborted !"
const config = {
    baseURL:baseUrl,
    timeout:20000,
    timeoutErrorMessage:timeoutMsg,
}
const axioInstance =axios.create(config)

export default axioInstance 