import FilterPrototype from "../../components/filtersPrototype";
import ComponentError from "../../components/componentError";
import getStateActivity from "../../hooks/getStateActivity";
import ListPrototype from "../../components/listPrototype";
import isActivitiesEnd from "../../hooks/isActivitiesEnd";
import ErrorBoundary from "../../utilities/ErrorBoundary";
import TableFact from "../../components/tables/TableFact";
import isUserAssigned from "../../hooks/isUserAssigned";
import getDataFromUrl from "../../hooks/getDataFromUrl";
import ModalPortal from "../../components/modelPortal";
import ResponsiveAppBar from "../../components/navbar";
import TableOT from "../../components/tables/TableOt";
import FormPay from "../../components/forms/formPay";
import headerList from "../../classes/headerList";
import openNewTab from "../../hooks/openNewTab";
import { useEffect, useState } from "react";
import Filters from "./components/filters";
import Style from "./otPage.module.css";
import editPay from "../../db/editPay";
import { Box } from "@mui/material";
function OtPage() {
    const [otFilter, setOtFilter] = useState({})
    const [listOt, setListOt] = useState()

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

    const [editFact, setEditFact] = useState()

    const [tag, setTag] = useState("Todas las OTs")
    const [clients, setClients] = useState({})

    useEffect(() => {
        getDataFromUrl("/getOT")
            .then(data => data.reverse())
            .then(data => {
                setListOt(data)
                setOtFilter(data)
                filterAllOt(data)
                return data
            })
            .then(allOt => {
                getDataFromUrl("/getPay")
                    .then(data => data.reverse())
                    .then(data => {
                        return data.map(fact => { return { ...fact, OTFact: getOTFact(allOt, fact.id) } })
                    })
                    .then(data => {
                        setPays(data)
                        setPaysEdit(data)
                    })
            })
        getDataFromUrl("/getClients")
            .then(data => setClients(data.map(client => client.Name).sort()))

        const getOTFact = (otList, id) => {
            const result = otList.filter(ot => {
                if (ot.Factura) {
                    return JSON.parse(ot.Factura).includes(id)
                }
                return false
            }).map(data => data.OTKey)
            return result;
        }
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
                setPaysEdit(pays.filter(pay => pay.datePay === null && new Date(pay.dateExpiration).getTime() > Date.now()));
                setTag("Pendientes");
                break;
            case "Vencidas":
                setPaysEdit(pays.filter(pay => pay.datePay === null && new Date(pay.dateExpiration).getTime() < Date.now()));
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
    const recharge = (OT) => {
        setOtFilter(prev => prev.map(otPrev => otPrev === OT ? OT : otPrev))
        setListOt(prev => prev.map(otPrev => otPrev === OT ? OT : otPrev))
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

    const searchById = (id) => {
        if (id) {
            filterOt(tag);
            setTimeout(() => {
                setOtFilter(prev => {
                    return prev.filter(ot => ot.OTKey.includes(id))
                });
            }, 200);
        } else {
            filterOt(tag);
        }
    }
    const selectClient = (client) => {
        if (client[0]) {
            setOtFilter(listOt.filter(ot => ot.Client.includes(client)));
        } else {
            filterOt(tag);
        }
    }
    const savePay = (pay) => {
        editPay({ ...pay, prevId: editFact.id })
    }
    const resetPay = () => {
        getDataFromUrl("/getPay")
            .then(data => data.reverse())
            .then(data => {
                setPays(data)
                setPaysEdit(data)
            })
    }
    const closeModal = () => {
        setEditFact()
        resetPay()
    }

    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.ContentOt}>
                <ErrorBoundary fallBackComponent={<ComponentError />} >
                    <Filters filterOt={filterOt} tag={tag} data={{ otRetired: otRetired.length, otSend: otSend.length, otDFR: otDFR.length, otOnProcess: otOnProcess.length, otEnd: otEnd.length, otWaiting: otWaiting.length, otToAssing: otToAssing.length, otToAuth: otToAuth.length, otOnCurse: otOnCurse.length }} />
                    {otFilter && (
                        tag === "Facturación" || tag === "Pendientes" || tag === "Cobradas" || tag === "Vencidas" ?
                            <ListPrototype
                                Table={TableFact}
                                header={headersFact.getHeader()}
                                list={paysEdit}
                                clickable={(data) => setEditFact(data)}
                                recharge={recharge}
                                height={"85%"} />
                            :
                            (
                                <Box component={"div"} sx={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "column", height: "90%" }}>
                                    <FilterPrototype
                                        search={{ onChange: searchById, label: "Por ID" }}
                                        select={{ onChange: selectClient, namesMultiple: clients }}

                                    />
                                    <ListPrototype
                                        Table={TableOT}
                                        header={headersOt.getHeader()}
                                        list={otFilter}
                                        clickable={(data) => openNewTab(`/events/${data.id}`)}
                                        recharge={recharge}
                                        height={"85%"} />
                                </Box>
                            )
                    )}
                </ErrorBoundary>
            </div>
            {editFact && (
                <ModalPortal type={"form"}>
                    <FormPay save={savePay} close={closeModal} pay={editFact} />
                </ModalPortal>
            )}
        </>
    );
}
export default OtPage;

const headersOt = new headerList()
headersOt.addHeader(" ", "3%")
headersOt.addHeader("ID", "15%")
headersOt.addHeader("Fecha", "9%")
headersOt.addHeader("Tipo", "13%")
headersOt.addHeader("Cliente", "15%")
headersOt.addHeader("Nombre Producto", "22%")
headersOt.addHeader("Estado", "15%")

const headersFact = new headerList()
headersFact.addHeader("ID", "15%")
headersFact.addHeader("Creación", "9%")
headersFact.addHeader("Vencimiento", "20%")
headersFact.addHeader("Cobro", "15%")
headersFact.addHeader("OT relacionada", "35%")