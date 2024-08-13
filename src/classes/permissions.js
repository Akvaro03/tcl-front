import typesUsers from "./typesUsers";

export default class permissions {
    static seeOt = [typesUsers.AdminSystem, typesUsers.Admin, typesUsers.Director, typesUsers.Colaborador]
    static listClients = [typesUsers.Admin, typesUsers.Director, typesUsers.AdminSystem]
    static statistics = [typesUsers.AdminSystem, typesUsers.Admin, typesUsers.Director]
    static createFact = [typesUsers.Admin, typesUsers.Director]
    static createOt = [typesUsers.Admin, typesUsers.Director]
    static OtList = [typesUsers.Admin, typesUsers.Director]
    static asingActv = [typesUsers.Colaborador]
    // static allUser = [typesUsers.AdminSystem] 
    static allUser = [typesUsers.AdminSystem, typesUsers.Admin, typesUsers.Director, typesUsers.Colaborador]
    static config = [typesUsers.AdminSystem]

    static editOt(rol) {
        const roles = [typesUsers.Director, typesUsers.Admin]
        try {
            return roles.includes(rol)
        } catch (error) {
            return false;
        }
    }
    static editPriority(rol) {
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
    static printOT(rol) {
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
    static seeDetails(rol) {
        const roles = [typesUsers.Director, typesUsers.Admin]
        try {
            return roles.includes(rol)
        } catch (error) {
            return false;
        }
    }
}