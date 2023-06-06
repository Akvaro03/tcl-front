import ModalPortal from "../../../../components/modelPortal";
import Timeline from "@mui/lab/Timeline/Timeline";
import ButtonNewStep from "../buttonNewStep";
import StepPath from "../stepPath";
import FormStep from "../formStep";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function PathTypeOt({ newPath, setNewPath }) {
    const [isFormStep, setIsFormStep] = useState(false)
    const [stepSelected, setStepSelected] = useState()
    const [typeForm, setTypeForm] = useState("")

    const addStep = (newStep) => {
        if (stepSelected) {
            const array = [...newPath]; // Array original
            const index = newPath.findIndex(step => step === stepSelected)
            array.splice(index + 1, 0, newStep); // Insertar el objeto en la posición 2
            setNewPath(array)
        } else {
            setNewPath(copy => {
                if (copy) {
                    return [...copy, newStep];
                } else {
                    return [newStep];
                }
            });
        }
        setStepSelected(null)
    }
    const deleteStep = () => {
        const copyPath = newPath.filter(step => step !== stepSelected);
        setNewPath(copyPath);
    }
    const editStep = (prevValue, newValue) => {
        setNewPath(prevPath => (
            prevPath.map(step => (step === prevValue ? newValue : step))
        ))
    }
    const callFormEdit = () => {
        setIsFormStep(true)
        setTypeForm("edit")
    }
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    const handleDragEnd = ({ destination, source }) => {
        if (!destination) return;
        setNewPath(reorder(newPath, source.index, destination.index));
    };
    return (
        <>
            {/* <Timeline position="alternate" sx={{ mb: 15, mt: 2 }}> */}
            <Timeline sx={{ mb: "5%", mt: 2 }}>
                {newPath ? (
                    <>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {
                                            newPath.map((step, key) => (
                                                // <Draggable
                                                //     key={key}
                                                //     index={key}
                                                //     draggableId={step.nameStep}
                                                // >
                                                //     {(provided, snapshot) => (
                                                //         <div ref={provided.innerRef}
                                                //             {...provided.draggableProps}
                                                //             {...provided.dragHandleProps}>
                                                //             <StepPath
                                                //                 key={key}
                                                //                 index={key}
                                                //                 item={step}
                                                //                 step={step}
                                                //                 editStep={callFormEdit}
                                                //                 deleteStep={deleteStep}
                                                //                 setIsFormStep={setIsFormStep}
                                                //                 stepSelected={stepSelected}
                                                //                 setStepSelected={setStepSelected} />
                                                //             {provided.placeholder}
                                                //         </div>
                                                //     )}
                                                // </Draggable>
                                                <Item
                                                    key={key}
                                                    index={key}
                                                    step={step}
                                                    editStep={callFormEdit}
                                                    deleteStep={deleteStep}
                                                    setIsFormStep={setIsFormStep}
                                                    stepSelected={stepSelected}
                                                    setStepSelected={setStepSelected}
                                                />
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </>
                ) : (
                    <ButtonNewStep setIsFormStep={setIsFormStep} text={"Agrega tu primer paso"} />
                )
                }
            </Timeline >
            {isFormStep && (
                <ModalPortal type={"form"}>
                    <FormStep setIsFormStep={setIsFormStep} editStep={editStep} stepSelected={stepSelected} typeForm={typeForm} addStep={addStep} setStepSelected={setStepSelected} />
                </ModalPortal>
            )}
        </>
    );
}
const Item = ({ index, item, dragItemStyle = {}, children }) => (
    <Draggable index={index} draggableId={item.id}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                    // default item style
                    padding: '8px 16px',
                    // default drag style
                    ...provided.draggableProps.style,
                    // customized drag style
                    ...(snapshot.isDragging ? dragItemStyle : {}),
                }}
            >
                <h1>aaaaaaaaa</h1>
            </div>
        )}
    </Draggable>
);

export default PathTypeOt;