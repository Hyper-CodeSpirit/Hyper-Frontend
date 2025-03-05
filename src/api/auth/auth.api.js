import BaseAPI from "../BaseApi";

export class AuthAPI {
  
    constructor() {
        this._baseApi = new BaseAPI();
    }
  async googleSignIn(user) {

    const {name, picture, email} = user;
    const data = {username: name, avatar:picture, email, authentication_method: 'google', created_date: new Date()};

    const response = await this._baseApi.post('/auth/google',data);
    if(response.status === 200) {
        const res = response.data;
        localStorage.setItem('token', JSON.stringify(res));
        localStorage.setItem('user', JSON.stringify({name, picture, email}));
      return response.data;
    }else {
        throw new Error(response.data.message);
    }
  }
}