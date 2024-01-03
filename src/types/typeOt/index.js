import createNewDate from "../../hooks/createNewDay";
import typeMaster from "../typeMaster";

export default class TypeOt extends typeMaster {
    constructor(
        otDate,
        Client,
        IdClient,
        Producto,
        Marca,
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
        id
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
            this.FechaVencimiento = otDate.FechaVencimiento;
            this.FechaEstimada = createNewDate(otDate.FechaEstimada);
            // this.Type = TypeString.nameType;
            this.Type = otDate.Type;
            this.Description = otDate.Description;
            this.Observations = otDate.Observations;
            this.Contact = otDate.Contact;
            this.Changes = otDate.Changes;
            this.Activities = otDate.Activities;
            this.Identificación = otDate.OTKey;
            this.priority = otDate.priority;
            this.id = otDate.id;
        } else {
            this.Date = createNewDate(otDate);
            this.Client = Client;
            // this.IdClient = ClientObjet.id;
            this.IdClient = IdClient;
            this.Producto = Producto;
            this.Marca = Marca;
            this.Modelo = Modelo;
            this.NormaAplicar = NormaAplicar;
            this.Cotizacion = Cotizacion;
            this.FechaVencimiento = FechaVencimiento;
            this.FechaEstimada = createNewDate(FechaEstimada);
            // this.Type = TypeString.nameType;
            this.Type = Type;
            this.Description = Description;
            this.Observations = Observations;
            this.Contact = Contact;
            this.Changes = Changes;
            this.Activities = Activities;
            this.Identificación = OTKey;
            this.priority = priority;
            this.id = id;
        }
    }
    verificateCreateOt() {

        if (this.Identificación.length <= 8) {
            return false
        }
        const propertiesToCheck = ["Client", "Producto", "Marca", "Modelo", "NormaAplicar", "Cotizacion", "FechaVencimiento", "Identificación", "Observations"]
        return this.verificate(propertiesToCheck)
    }
}
