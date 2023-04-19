import ResponsiveAppBar from "../../components/navbar";
import StatisticsContent from "./components/statisticsContent";
import Style from './statiticsPage.module.css'
function StatisticsPage() {
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.BodyStatistics}>
                <StatisticsContent />
            </div>
        </>
    );
}

export default StatisticsPage;