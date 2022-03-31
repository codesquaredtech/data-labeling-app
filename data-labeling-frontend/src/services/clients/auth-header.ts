import { TokenService } from "../TokenService";

export default function authHeader() {
    const userStr = TokenService.getToken();
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };       // for Node Express back-end
    } else {
      return {};
    }
  }