import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class TamagotchiApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${TamagotchiApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }



  // Individual API routes

  //adopt pokePet (make user the owner of the pokePet by adding pet to userPets table) send the data to the backend
  static async adoptPokePet(userId, pokePetId, data) {
    console.log('Adopting pokePet:', pokePetId, 'for user:', userId);
    let res = await this.request(`adopt/${userId}/${pokePetId}`, data, "post");
    return res.pokePets;
  }


  //get the current user by username
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  //get pet by id
  static async getPet(id) {
    let res = await this.request(`pet/${id}`);
    return res.pets;
  }

  //get pokePet by id
  static async getPokePet(id) {
    let res = await this.request(`pokePets/${id}`);
    return res.pokePets;
  }

  //get userPets by username
  static async getUserPetsById(userId, userPetId) {
    let res = await this.request(`${userId}/${userPetId}`);
    return res.userPets;
  }
  
  //get a pet by usename
  static async getUserPets(username) {
    let res = await this.request(`pet/${username}`);
    return res.pets;
  }

  //get all pokePets
  static async getPokePets() {
    let res = await this.request(`pokePets`);
    return res.pokePets;
  }

  //search for a pokePet
  static async searchPokePets(searchTerm) {
    try {
      const res = await this.request(`pokePets/search?searchTerm=${searchTerm}`);
      return res.pokePets;
    } catch (error) {
      throw new Error(`Error searching for pokePets: ${error.message}`);
    }
  }

  //login
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }  

  //register
  static async register(data) {
    try {
      let res = await axios.post(`${BASE_URL}/auth/register`, data);
      return res.data.token;
    } catch (err) {
      throw new Error(err.response.data.error.message);
    }
  }  

  //save user profile
  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}

// for now, put token ("testuser" / "password" on class)
TamagotchiApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  export default TamagotchiApi;
  
  


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc