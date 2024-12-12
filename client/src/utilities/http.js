import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL
const timeoutMsg = "Waiting for too long....Request aborted !"
const config = {
    baseURL: BASEURL,
    timeout:20000,
    timeoutErrorMessage:timeoutMsg,
}
const axioInstance =axios.create(config)

export default axioInstance 