import createApiClient from "@services/api.service";

class userService {
  constructor(path = "/account") {
    this.api = createApiClient(path);
  }
  async getLoggedInUser(id) {
    return this.api.get(`/${id}`);
  }
}
export default new userService();
