const AccesoProhibido= use('App/Exceptions/AccesoProhibidoException');
const RecursoNoEncontrado=use('App/Exceptions/RecursoNoEncontradoException');
class AutorizacionService{
  
    verificarPermiso(recurso, user){
        if(!recurso){
            throw new RecursoNoEncontrado();
        }
        if(recurso.user_id !== user.id){  
            throw new AccesoProhibido();
        };
    }
}

module.exports = new AutorizacionService();