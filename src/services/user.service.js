import createApiClient from "@services/api.service";

class userService {
  constructor(path = "/account") {
    this.api = createApiClient(path);
  }
  async getLoggedInUser() {
    return this.api.get("/:id");
  }

  async updateProfile(data) {
    return this.api.put("/:id", data);
  }
}
export default new userService();
