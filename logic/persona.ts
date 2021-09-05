
export interface Dialogo {
     fecha: Date;
     numeroSecuencia:number;
     escrito:string;
}
export  class Persona {

    public agregarDialogo(dialogo:Dialogo ):Dialogo{
        return {fecha:dialogo.fecha,
            numeroSecuencia:dialogo.numeroSecuencia,
            escrito:dialogo.escrito}
    }
}
