import createNewDate from "../../hooks/createNewDay";
import typeMaster from "../typeMaster";

export default class TypeOt extends typeMaster {
    constructor(
        otDate,
        Client,
        IdClient,
        Producto,
        Marca,
        nLacre,
        Modelo,
        NormaAplicar,
        Cotizacion,
        FechaVencimiento,
        FechaEstimada,
        Type,
        Description,
        Observations,
        Contact,
        Changes,
        Activities,
        OTKey,
        priority,
        id,
        contractName
    ) {
        super()
        if (otDate.Date) {
            this.Date = createNewDate(otDate.Date);
            this.Client = otDate.Client;
            // this.IdClient = ClientObjet.id;
            this.IdClient = otDate.IdClient;
            this.Producto = otDate.Producto;
            this.Marca = otDate.Marca;
            this.Modelo = otDate.Modelo;
            this.NormaAplicar = otDate.NormaAplicar;
            this.Cotizacion = otDate.Cotizacion;
            this.FechaVencimiento = createNewDate(otDate.FechaVencimiento);
            this.FechaEstimada = createNewDate(otDate.FechaEstimada);
            // this.Type = TypeString.nameType;
            this.Type = otDate.Type;
            this.nLacre = otDate.nLacre;
            this.Description = otDate.Description;
            this.Observations = otDate.Observations;
            this.Contact = JSON.stringify(otDate.Contact);
            this.Changes = otDate.Changes;
            this.Activities = otDate.Activities;
            this.Identificación = otDate.OTKey;
            this.priority = otDate.priority;
            this.id = otDate.id;
            this.contractName = JSON.stringify(otDate.contractName);
        } else {
            this.Date = createNewDate(otDate);
            this.Client = Client;
            // this.IdClient = ClientObjet.id;
            this.IdClient = IdClient;
            this.nLacre = nLacre;
            this.Producto = Producto;
            this.Marca = Marca;
            this.Modelo = Modelo;
            this.NormaAplicar = NormaAplicar;
            this.Cotizacion = Cotizacion;
            this.FechaVencimiento = createNewDate(FechaVencimiento);
            this.FechaEstimada = createNewDate(FechaEstimada);
            // this.Type = TypeString.nameType;
            this.Type = Type;
            this.Description = Description;
            this.Observations = Observations;
            this.Contact = JSON.stringify(Contact);
            this.Changes = Changes;
            this.Activities = Activities;
            this.Identificación = OTKey;
            this.priority = priority;
            this.id = id;
            this.contractName = JSON.stringify(contractName);
        }
    }
    verificateCreateOt() {

        if (this.Identificación.length <= 8) {
            return false
        }
        const propertiesToCheck = ["Client", "Producto", "Marca", "Modelo", "NormaAplicar", "Cotizacion", "Identificación"]
        return this.verificate(propertiesToCheck)
    }
}
