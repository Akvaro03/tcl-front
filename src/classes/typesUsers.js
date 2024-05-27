export default class typesUsers {
    static AdminSystem = "Administrador del sistema"
    static Colaborador = "Colaborador"
    static Admin = "Administracion"
    static Director = "Director"


    static getDefaultPage(rol) {
        const defaultPage = {
            "Administrador del sistema" : "/configuración",
            Colaborador : "/OtAsingPages",
            Administracion : "/OtList",
            Director : "/OtList",
        }
        return defaultPage[rol]
    }
    // Colaborador
    // Empieza - Termina actividad


    // ADMIN
    // Muestras
    // Facturas 
    // Clientes

    // Director
    // Asignar OT
    // Autorizar OT
    // Modificar Score actividad
    // Facturas
}