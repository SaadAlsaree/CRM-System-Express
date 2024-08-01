import { jwtDecode } from "jwt-decode";

const isValidToken = (token: string) => {
    if (!token) {
        return false;
    }

    const decodedToken = jwtDecode(token);

    const currentTime = Date.now() / 1000;


    return decodedToken.exp !== undefined && decodedToken.exp > currentTime;

};

export default isValidToken;
