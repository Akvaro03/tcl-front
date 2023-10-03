import isActivitiesEnd from "../../hooks/isActivitiesEnd";
import isUserAssigned from "../../hooks/isUserAssigned";
import getDataFromUrl from "../../hooks/getDataFromUrl";
import ResponsiveAppBar from "../../components/navbar";
import ListPays from "../../components/list/listPays";
import ListOt from "../../components/list/listOt";
import { useEffect, useState } from "react";
import Filters from "./components/filters";
import Style from "./otPage.module.css"
import getStateActivity from "../../hooks/getStateActivity";
function OtPage() {
    const [listOt, setListOt] = useState()
    const [otFilter, setOtFilter] = useState({})

    const [otOnProcess, setOtOnProcess] = useState({})
    const [otToAssing, setOtToAssing] = useState({})
    const [otWaiting, setOtWaiting] = useState({})
    const [otOnCurse, setOtOnCurse] = useState({})
    const [otToAuth, setOtToAuth] = useState({})
    const [otEnd, setOtEnd] = useState({})

    const [otRetired, setOtRetired] = useState({})
    const [otSend, setOtSend] = useState({})
    const [otDFR, setOtDFR] = useState({})

    const [paysEdit, setPaysEdit] = useState()
    const [pays, setPays] = useState()


    const [tag, setTag] = useState("Todas las OTs")
    useEffect(() => {
        getDataFromUrl("/getOT")
            .then(data => data.reverse())
            .then(data => {
                setListOt(data)
                setOtFilter(data)
                filterAllOt(data)
            });
        getDataFromUrl("/getPay")
            .then(data => data.reverse())
            .then(data => {
                setPays(data)
                setPaysEdit(data)
            })
    }, [])

    const filterOt = (type, data) => {
        switch (type) {
            // OTs
            case "Todas las OTs":
                setOtFilter(listOt);
                setTag("Todas las OTs");
                break;
            case "En proceso":
                setOtFilter(listOt.filter(ot => getStateActivity(ot) === "En proceso"));
                setTag("En proceso");
                break;
            case "En espera":
                setOtFilter(listOt.filter(ot => getStateActivity(ot) === "En espera"));
                setTag("En espera");
                break;
            case "Sin Asignar":
                setOtFilter(listOt.filter(ot => !isUserAssigned(ot)));

                setTag("Sin Asignar");
                break;
            case "Sin Autorizar":
                setOtFilter(listOt.filter(ot => ot.Auth === "0"));

                setTag("Sin Autorizar");
                break;
            case "Terminadas":
                setOtFilter(listOt.filter(ot => getStateActivity(ot) === "Terminada"));
                setTag("Terminadas");
                break;


            // Productos
            case "Disposición de Productos":
                filterOt("Retirados")
                break;

            case "Retirados":
                setOtFilter(listOt.filter(ot => ot.Availability && JSON.parse(ot.Availability).type === "Retiro"));
                setTag("Retirados");
                break;
            case "Entregados":
                setOtFilter(listOt.filter(ot => ot.Availability && JSON.parse(ot.Availability).type === "Entrega"));
                setTag("Entregados");
                break;
            case "DFR":
                setOtFilter(listOt.filter(ot => ot.Availability && JSON.parse(ot.Availability).type === "DFR"));
                setTag("DFR");
                break;

            // Facturas
            case "Facturación":
                filterOt("Pendientes")
                break;
            case "OTs sin facturar":
                setOtFilter(listOt.filter(OT => OT.Factura === null));
                setTag("OTs sin facturar");
                break;
            case "Pendientes":
                setPaysEdit(pays.filter(pay => pay.datePay === null));
                setTag("Pendientes");
                break;
            case "Vencidas":
                setPaysEdit(pays.filter(pay => new Date(pay.dateExpiration).getTime() < Date.now()));
                setTag("Vencidas");
                break;
            case "Cobradas":
                setPaysEdit(pays.filter(pay => pay.datePay !== null));
                setTag("Cobradas");
                break;

            case "searchId":
                if (data) {
                    setOtFilter(prev => prev.filter(ot => ot.OTKey.includes(data.toUpperCase())));
                } else {
                    filterOt(tag);
                }
                break;
            case "selectClient":
                if (data[0]) {
                    setOtFilter(listOt.filter(ot => ot.Client.includes(data)));
                } else {
                    setOtFilter(prev => prev.filter(ot => data.includes(ot.Client)));
                }
                break;
            default:
                break;
        }

    }
    const handleChangeAuth = (OT) => {
        setOtFilter(prev => prev.map(otPrev => otPrev === OT ? { ...OT, Auth: 1 } : otPrev))
        setListOt(prev => prev.map(otPrev => otPrev === OT ? { ...OT, Auth: 1 } : otPrev))
    }
    const filterAllOt = (OTList) => {
        setOtFilter(OTList);
        setTag("Todas las OTs");
        setOtOnProcess(OTList.filter(ot => getStateActivity(ot) === "En proceso"))
        setOtWaiting(OTList.filter(ot => getStateActivity(ot) === "En espera"))
        setOtToAssing(OTList.filter(ot => !isUserAssigned(ot)))
        setOtOnCurse(OTList.filter(ot => !isActivitiesEnd(ot.Activities) && isUserAssigned(ot) && ot.Auth === "1"))
        setOtToAuth(OTList.filter(ot => ot.Auth === "0"))
        setOtEnd(OTList.filter(ot => getStateActivity(ot) === "Terminada"))

        setOtRetired(OTList.filter(ot => ot.Availability && JSON.parse(ot.Availability).type === "Retiro"))
        setOtSend(OTList.filter(ot => ot.Availability && JSON.parse(ot.Availability).type === "Entrega"))
        setOtDFR(OTList.filter(ot => ot.Availability && JSON.parse(ot.Availability).type === "DFR"))
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.ContentOt}>
                <Filters filterOt={filterOt} tag={tag} data={{ otRetired: otRetired.length, otSend: otSend.length, otDFR: otDFR.length, otOnProcess: otOnProcess.length, otEnd: otEnd.length, otWaiting: otWaiting.length, otToAssing: otToAssing.length, otToAuth: otToAuth.length, otOnCurse: otOnCurse.length }} />
                {otFilter && (
                    tag === "Facturación" || tag === "Pendientes" || tag === "Cobradas" || tag === "Vencidas" ?
                        <ListPays pays={paysEdit} />
                        :
                        <ListOt listOt={otFilter} filterOt={filterOt} handleAuth={handleChangeAuth} />
                )}
            </div>
        </>
    );
}
export default OtPage;