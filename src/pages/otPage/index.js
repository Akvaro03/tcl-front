import isActivitiesEnd from "../../hooks/isActivitiesEnd";
import isUserAssigned from "../../hooks/isUserAssigned";
import getDataFromUrl from "../../hooks/getDataFromUrl";
import ResponsiveAppBar from "../../components/navbar";
import ListPays from "../../components/list/listPays";
import ListOt from "../../components/list/listOt";
import { useEffect, useState } from "react";
import Filters from "./components/filters";
import Style from "./otPage.module.css"
function OtPage() {
    const [listOt, setListOt] = useState()
    const [otFilter, setOtFilter] = useState({})

    const [otOnProcess, setOtOnProcess] = useState({})
    const [otToAssing, setOtToAssing] = useState({})
    const [otOnCurse, setOtOnCurse] = useState({})
    const [otToAuth, setOtToAuth] = useState({})
    const [otEnd, setOtEnd] = useState({})

    const [otRetired, setOtRetired] = useState({})
    const [otSend, setOtSend] = useState({})
    const [otDFR, setOtDFR] = useState({})

    const [pays, setPays] = useState()
    const [paysEdit, setPaysEdit] = useState()


    const [tag, setTag] = useState("Todas")
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
            case "Todas":
                setOtFilter(listOt);
                setTag("Todas");
                break;
            case "En proceso":
                setOtFilter(listOt.filter(ot => getState(ot) === "En proceso"));
                setOtFilter(listOt.filter(ot => !isUserAssigned(ot)));

                setTag("En proceso");
                break;
            case "Sin Asignar":
                setOtFilter(listOt.filter(ot => !isUserAssigned(ot)));

                setTag("Sin Asignar");
                break;
            case "En curso":
                setOtFilter(listOt.filter(ot => !isActivitiesEnd(ot.Activities) && isUserAssigned(ot) && ot.Auth === "1"));
                setTag("En curso");
                break;
            case "Sin Autorizar":
                setOtFilter(listOt.filter(ot => ot.Auth === "0"));

                setTag("Sin Autorizar");
                break;
            case "Terminadas":
                setOtFilter(listOt.filter(ot => getState(ot) === "Terminada"));
                setTag("Terminadas");
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

            case "Facturas":
                filterOt("Pendientes")
                break;
            case "OT sin facturar":
                setOtFilter(listOt.filter(OT => OT.Factura === null));
                setTag("OT sin facturar");
                break;
            case "Pendientes":
                setPaysEdit(pays.filter(pay => pay.datePay === null));
                setTag("Pendientes");
                break;
            case "Vencidos":
                setPaysEdit(pays.filter(pay => new Date(pay.dateExpiration).getTime() < Date.now()));
                setTag("Vencidos");
                break;
            case "Cobrados":
                setPaysEdit(pays.filter(pay => pay.datePay !== null));
                setTag("Cobrados");
                break;

            case "searchId":
                if (data) {
                    setOtFilter(prev => prev.filter(ot => ot.id === Number(data)));
                } else {
                    filterOt(tag);
                }
                break;
            case "selectClient":
                if (data[0]) {
                    setOtFilter(listOt.filter(ot => data.includes(ot.Client)));
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
        setTag("Todas");
        setOtOnProcess(OTList.filter(ot => getState(ot) === "En proceso"))
        setOtOnProcess(OTList.filter(ot => !isUserAssigned(ot)))
        setOtToAssing(OTList.filter(ot => !isUserAssigned(ot)))
        setOtOnCurse(OTList.filter(ot => !isActivitiesEnd(ot.Activities) && isUserAssigned(ot) && ot.Auth === "1"))
        setOtToAuth(OTList.filter(ot => ot.Auth === "0"))
        setOtEnd(OTList.filter(ot => getState(ot) === "Terminada"))

        setOtRetired(OTList.filter(ot => ot.Availability && JSON.parse(ot.Availability).type === "Retiro"))
        setOtSend(OTList.filter(ot => ot.Availability && JSON.parse(ot.Availability).type === "Entrega"))
        setOtDFR(OTList.filter(ot => ot.Availability && JSON.parse(ot.Availability).type === "DFR"))
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.ContentOt}>
                <Filters filterOt={filterOt} tag={tag} data={{ otRetired: otRetired.length, otSend: otSend.length, otDFR: otDFR.length, otOnProcess: otOnProcess.length, otEnd: otEnd.length, otToAssing: otToAssing.length, otToAuth: otToAuth.length, otOnCurse: otOnCurse.length }} />
                {otFilter && (
                    tag === "Facturas" || tag === "Pendientes" || tag === "Cobrados" || tag === "Vencidos" ?
                        <ListPays pays={paysEdit} />
                        :
                        <ListOt listOt={otFilter} filterOt={filterOt} handleAuth={handleChangeAuth} />
                )}
            </div>
        </>
    );
}
const getState = (ot) => {
    try {
        const activities = JSON.parse(ot.Activities);
        const auth = ot.Auth;

        const allActivitiesEnded = activities.every(data => data.state === "End");
        const allActivitiesInProgress = activities.every(data => data.state === "En proceso");

        if (allActivitiesEnded && auth) {
            return "Terminada";
        }

        if (allActivitiesInProgress && auth) {
            return "En curso";
        }
        return "No empezo";
    } catch (error) {
        return "Terminada";
    }
}
export default OtPage;