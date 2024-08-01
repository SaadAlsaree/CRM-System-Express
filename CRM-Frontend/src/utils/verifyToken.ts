import { jwtDecode, JwtPayload } from "jwt-decode";

const isValidToken = (token: string): boolean => {
    if (!token) {
        return false;
    }

    // Decode the token
    const decodedToken: JwtPayload & { isActivated?: boolean } = jwtDecode(token);

    // Get the current time in seconds
    const currentTime = Date.now() / 1000;

    // Check if 'exp' is defined and token is not expired
    const isNotExpired = decodedToken.exp !== undefined && decodedToken.exp > currentTime;

    // Check if 'isActivated' is true
    const isActivated = decodedToken.isActivated === true;

    // Return true if both conditions are met
    return isNotExpired && isActivated;
};

export default isValidToken;
