import createApiClient from "@services/api.service";

class userService {
  constructor(path = "/account") {
    this.api = createApiClient(path);
  }
}
export default new userService();
