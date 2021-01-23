'use strict'
const Proyecto= use('App/Models/Proyecto');
const AutorizacionService= use('App/Services/AutorizacionService');
class ProyectoController {
    async index({auth}){  //devuelve toda la lista de proyectos, solo usuarios registrados pueden ver
        const user = await auth.getUser();
        return await user.proyectos().fetch();  //nos devuelve todos los proyectos  user.proyectos es la relación
    }
    async create({auth, request}) {
        const user = await auth.getUser();
        const {nombre} = request.all(); //el nombre de todo lo que encentre en el servidor
        const proyecto = new Proyecto();
        proyecto.fill({
            nombre
        });
        await user.proyectos().save(proyecto); //se ha creado un nuevo proyecto
        return proyecto; //el usuario ya lo puede ver
    }
    async destroy ({auth, params}) {
        const user = await auth.getUser(); //toma al usuario
        const {id} = params;
        const proyecto = await Proyecto.find(id); //buscar por ID
        AutorizacionService.verificarPermiso(proyecto, user);
        await proyecto.delete(); //elimina proyecto
        return proyecto; //esto se puede usar para avisar al usuario que se elimino el proyecto
        
    }

    async update ({ auth, params, request }) {
        const user = await auth.getUser();
        const {id}=params;
        const proyecto= await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto,user);
        proyecto.merge(request.only('nombre'));
        await proyecto.save();
        return proyecto;
    }

}

module.exports = ProyectoController
