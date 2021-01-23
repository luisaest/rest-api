'use strict'
const Proyecto = use('App/Models/Proyecto');
const Tarea = use('App/Models/Tarea');
const AutorizacionService= use('App/Services/AutorizacionService');
class TareaController {
    async index({auth,request,params}){
       const user = await auth.getUser();
       const {id}=params;
       const proyecto =await Proyecto.find(id);
       AutorizacionService.verificarPermiso(proyecto,user);
       return await proyecto.tareas().fetch();

    }


    async create({auth,request,params}){
        const user = await auth.getUser();
        const {descripcion} =request.all();
        const {prioridad} =request.all();                     //se agrega columna de prioridad 
        const {id} = params;
        const proyecto = await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto,user);
        const tarea = new Tarea();
        tarea.fill({
            descripcion,
            prioridad
        });
        await proyecto.tareas().save(tarea);
        return tarea;
    }
    async destroy ({auth,  params}) {
        const user = await auth.getUser(); //toma al usuario
        const {id} = params;
        const tarea = await Tarea.find(id);
        const proyecto = await tarea.proyecto().fetch();
        AutorizacionService.verificarPermiso(proyecto, user);
        await tarea.delete(); //elimina proyecto
        return tarea; //esto se puede usar para avisar al usuario que se elimino el proyecto
        
    }

    async update ({auth,  params, request}) {
        const user = await auth.getUser(); //toma al usuario
        const {id} = params;
        const tarea = await Tarea.find(id);
        const proyecto = await tarea.proyecto().fetch();
        AutorizacionService.verificarPermiso(proyecto, user);
        await tarea.merge(request.only([
            'descripcion',
            'completada',
            'prioridad'                            //se agrego una columna de prioridad
        ])); 
        return tarea.save();
        
    }
}


module.exports = TareaController
