export default class typesUsers {
    static AdminSystem = "Administrador del sistema"
    static Trabajador = "Trabajador"
    static Admin = "Administrador"
    static Director = "Director"


    static getDefaultPage(rol) {
        const defaultPage = {
            "Administrador del sistema" : "/configuración",
            Trabajador : "/OtAsingPages",
            Administrador : "/OtList",
            Director : "/OtList",
        }
        return defaultPage[rol]
    }
    // TRABAJADOR
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