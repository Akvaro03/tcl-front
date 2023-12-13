import typesUsers from "./typesUsers";

export default class permissions {
    static statistics = [typesUsers.AdminSystem, typesUsers.Admin, typesUsers.Director]
    static seeOt = [typesUsers.AdminSystem, typesUsers.Admin, typesUsers.Director, typesUsers.Trabajador]
    static listClients = [typesUsers.Admin, typesUsers.Director]
    static createFact = [typesUsers.Admin, typesUsers.Director]
    static createOt = [typesUsers.Admin, typesUsers.Director]
    static OtList = [typesUsers.Admin, typesUsers.Director]
    static asingActv = [typesUsers.Trabajador]
    // static allUser = [typesUsers.AdminSystem]
    static allUser = [typesUsers.AdminSystem, typesUsers.Admin, typesUsers.Director, typesUsers.Trabajador]
    static config = [typesUsers.AdminSystem]

    static editOt(rol) {
        const roles = [typesUsers.Director]
        try {
            return roles.includes(rol)
        } catch (error) {
            return false;
        }
    }
    static editAuth(rol) {
        const roles = [typesUsers.Director]
        try {
            return roles.includes(rol)
        } catch (error) {
            return false;
        }
    }
    static seeHistory(rol) {
        const roles = [typesUsers.Director]
        try {
            return roles.includes(rol)
        } catch (error) {
            return false;
        }
    }
    static seePayList(rol) {
        const roles = [typesUsers.Director, typesUsers.Admin]
        try {
            return roles.includes(rol)
        } catch (error) {
            return false;
        }
    }
    static editActv(rol) {
        const roles = [typesUsers.Director]
        try {
            return roles.includes(rol)
        } catch (error) {
            return false;
        }
    }
    static editMuestra(rol) {
        const roles = [typesUsers.Director, typesUsers.Admin]
        try {
            return roles.includes(rol)
        } catch (error) {
            return false;
        }
    }
    static editPay(rol) {
        const roles = [typesUsers.Director, typesUsers.Admin]
        try {
            return roles.includes(rol)
        } catch (error) {
            return false;
        }
    }
    static addContactOt(rol) {
        const roles = [typesUsers.Director, typesUsers.Admin]
        try {
            return roles.includes(rol)
        } catch (error) {
            return false;
        }
    }
    static seeDetails(rol){
        const roles = [typesUsers.Director, typesUsers.Admin]
        try {
            return roles.includes(rol)
        } catch (error) {
            return false;
        }
    }
}