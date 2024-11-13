import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent/TimelineOppositeContent";
import TimelineConnector from "@mui/lab/TimelineConnector/TimelineConnector";
import TimelineSeparator from "@mui/lab/TimelineSeparator/TimelineSeparator";
import TimelineContent from "@mui/lab/TimelineContent/TimelineContent";
import TimelineItem from "@mui/lab/TimelineItem/TimelineItem";
import TimelineDot from "@mui/lab/TimelineDot/TimelineDot";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import Timeline from "@mui/lab/Timeline/Timeline";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Style from "./historyOt.module.css";
function HistoryOt({ history }) {
  const [History, setHistory] = useState();
  const [HistoryModified, setHistoryModified] = useState();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const changes = history[0] ? history : JSON.parse(history);
        const changesOrdened = orderChanges(changes, false);
        setHistory(changesOrdened);
        setHistoryModified(changesOrdened);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHistory();
  }, [history]);
  return (
    <div className={Style.contentHistory}>
      <Timeline sx={{ padding: "0px" }}>
        {History &&
          HistoryModified.map((Change, key) => {
            return (
              <TimelineItem key={key}>
                <TimelineOppositeContent
                  sx={{
                    m: "auto 0",
                    width: "10%",
                    display: "flex",
                    flexWrap: "wrap", // Permitir que el contenido se envuelva
                    textAlign: "right", // Alinear el texto a la derecha
                    wordBreak: "break-word", // Permitir quiebres en las palabras largas si es necesario
                  }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  {new Date(Change.date).toLocaleDateString("en-GB")}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot>
                    <BookmarksIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2, overflow: "hidden" }}>
                  <Typography
                    className={Style.tittleHistory}
                    variant="h6"
                    component="span"
                  >
                    {Change.userName}
                  </Typography>
                  <Typography variant="h10" component="p" color={"#535353"}>
                    {Change.ChangeDescription}
                  </Typography>
                  {Change.comment.length > 0 && (
                    <>
                      <Typography
                        fontSize={"14px"}
                        component="span"
                        color={"#9d9d9d"}
                      >
                        {Change.comment}
                      </Typography>
                    </>
                  )}
                </TimelineContent>
              </TimelineItem>
            );
          })}
      </Timeline>
    </div>
  );
}
const orderChanges = (changes, ascending = true) => {
  return changes.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export default HistoryOt;
