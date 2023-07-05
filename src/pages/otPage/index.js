import { useEffect, useState } from "react";
import ListOt from "../../components/listOt";
import ResponsiveAppBar from "../../components/navbar";
import getDataFromUrl from "../../hooks/getDataFromUrl";
import Style from "./otPage.module.css"
import Filters from "./components/filters";
import isUserAssigned from "../../hooks/isUserAssigned";
import isActivitiesEnd from "../../hooks/isActivitiesEnd";
function OtPage() {
    const [listOt, setListOt] = useState()
    const [otFilter, setOtFilter] = useState()
    const [tag, setTag] = useState("Todas")
    useEffect(() => {
        getDataFromUrl("http://localhost:4000/getOT")
            .then(data => {
                setListOt(data)
                setOtFilter(data)
            })
    }, [])
    const filterOt = (type, data) => {
        if (type === "Asignar") {
            setOtFilter(listOt.filter(ot => !isUserAssigned(ot)))
            setTag("Asignar")
        }
        if (type === "En curso") {
            setOtFilter(listOt.filter(ot => !isActivitiesEnd(ot.Activities) && isUserAssigned(ot) && ot.Auth === "1"))
            setTag("En curso")
        }
        if (type === "Autorizar") {
            setOtFilter(listOt.filter(ot => ot.Auth === "0"))
            setTag("Autorizar")
        }
        if (type === "Todas") {
            setOtFilter(listOt)
            setTag("Todas")
        }
        if (type === "searchId") {
            if (data) {
                setOtFilter(prev => prev.filter(ot => ot.id === Number(data)))
            } else {
                filterOt(tag)
            }
        }
        if (type === "selectClient") {
            if (data[0]) {
                if (data[1]) {
                    setOtFilter(listOt.filter(ot => data.includes(ot.Client)))
                } else {
                    setOtFilter(prev => prev.filter(ot => data.includes(ot.Client)))
                }
            } else {
                filterOt(tag)
            }
        }
    }
    const handleChangeAuth = (OT) => {
        setOtFilter(prev => prev.map(otPrev => otPrev === OT ? { ...OT, Auth: 1 } : otPrev))
        setListOt(prev => prev.map(otPrev => otPrev === OT ? { ...OT, Auth: 1 } : otPrev))
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.ContentOt}>
                <Filters filterOt={filterOt} />
                {otFilter && (
                    <ListOt listOt={otFilter} filterOt={filterOt} handleAuth={handleChangeAuth} />
                )}
            </div>
        </>
    );
}

export default OtPage;