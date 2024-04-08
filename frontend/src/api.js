import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class TamagotchiApi {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${TamagotchiApi.token}` };
    const params = method === "get" ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      console.debug("API Response:", response.data); // Log the response data
      return response.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
}


  // Individual API routes

  //adopt pokePet (make user the owner of the pokePet by adding pet to userPets table) send the data to the backend
  static async adoptPokePet(data) {
    try {
      let res = await this.request(`pokePets/adopt`, data, "post");
      console.log('API response after adopting pokePet:', res);
      
      if (res && res.pokePet) {
        console.log('API adopted pokePet:', res.pokePet);
        return res.pokePet;
      } else {
        console.error('API response does not contain pokePet:', res);
        return null; // Handle the case when pokePet is not returned in the response
      }
    } catch (error) {
      console.error('API error while adopting pokePet:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }  

  //get the current user by username
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  //get all pets by userId
  static async getPetsByUserId(userId) {
    try {
        const res = await this.request(`pets/${userId}`);
        return res;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
  }

  //get pet details
  static async getPetDetails(petId) {
    try {
        const res = await this.request(`pet/${petId}`);
        return res;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
  }

  //interact with pet
  static async interactWithPet(petId, interactionType) {
    try {
      const res = await this.request(`pet/${petId}/interact`, { interactionType }, "post");
      return res; 
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
  }

  //get a userpet by id
  static async getPet(id) {
    let res = await this.request(`pet/${id}`);
    return res.pets;
  }

  //get a pokePet by id
  static async getPokePet(id) {
    let res = await this.request(`pokePets/${id}`);
    return res.pokePets;
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

  export default TamagotchiApi;
  