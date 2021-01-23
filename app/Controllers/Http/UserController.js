'use strict'

const User =use('App/Models/User.js')

class UserController {
    async login({request, auth}){
        const {email, password} = request.all();
        const token = await auth.attempt(email, password); //intenta encontrar al usuario
        return token; // devuelve el token
    }
   async store({request}){  //se usa este nombre por convension, request es para recibir la info
        const {email, password } = request.all();
        console.log(email, password);
        const user = await User.create({  //esperar a la creación
            email,
            password,
            username: email  //se igualan
        });
        return this.login(...arguments); //devuelve
    };
}
module.exports = UserController
