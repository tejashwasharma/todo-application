import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Formik, Field, Form } from 'formik';
import { FlexBox, H3, Hightlight, ListContainer, Button, Card, CardHeader, CardBody, CardFooter, Div } from '..';
import { createBoardItem, getProjectBoard, updateBoardItem } from '../../redux/actions/user.action';
import colors from '../../utils/colors';
import CollapsableSideBar from '../CollapsableSideBar';

const BoardList = ({ board }) => {
    const [creatorMode, toggleCreatorMode] = useState(false);
    const [editCard, updateEditCard] = useState(null);
    let boardData = board;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjectBoard());
    }, [])

    const onDragEnd = ({ destination, draggableId, source }) => {
        let item = boardData[source.droppableId].find(i => i._id === draggableId);
        item.position = destination.index;
        item.status = destination.droppableId;
        boardData[source.droppableId].splice(source.index, 1);
        boardData[destination.droppableId].splice(destination.index, 0, item);
        dispatch(updateBoardItem(item));
    };

    const CreateItem = ({ status }) => (
        <Card>
            <Formik
                initialValues={{ title: '', description: '' }}
                onSubmit={(values, { resetForm }) => {
                    dispatch(createBoardItem({ ...values, status: status, position: 0 }));
                    toggleCreatorMode(false);
                    resetForm();
                }}
            >
                {(props) => (
                    <Form className="todo-item">
                        <CardHeader>
                            <Field type='text' name="title" placeholder="Give your task a title" required />
                        </CardHeader>
                        <CardBody>
                            <Field component="textarea" name="description" placeholder="Description.." rows="4" required />
                        </CardBody>
                        <CardFooter>
                            <Button sm type='submit' background={colors.primaryButton} color={colors.white}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 50 50" width="26px" height="26px"><path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" /></svg>
                            </Button>
                            <Button sm type="reset" background={colors.red} color={colors.white} onClick={() => toggleCreatorMode(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 26 26" width="26px" height="26px"><path d="M 11 -0.03125 C 10.164063 -0.03125 9.34375 0.132813 8.75 0.71875 C 8.15625 1.304688 7.96875 2.136719 7.96875 3 L 4 3 C 3.449219 3 3 3.449219 3 4 L 2 4 L 2 6 L 24 6 L 24 4 L 23 4 C 23 3.449219 22.550781 3 22 3 L 18.03125 3 C 18.03125 2.136719 17.84375 1.304688 17.25 0.71875 C 16.65625 0.132813 15.835938 -0.03125 15 -0.03125 Z M 11 2.03125 L 15 2.03125 C 15.546875 2.03125 15.71875 2.160156 15.78125 2.21875 C 15.84375 2.277344 15.96875 2.441406 15.96875 3 L 10.03125 3 C 10.03125 2.441406 10.15625 2.277344 10.21875 2.21875 C 10.28125 2.160156 10.453125 2.03125 11 2.03125 Z M 4 7 L 4 23 C 4 24.652344 5.347656 26 7 26 L 19 26 C 20.652344 26 22 24.652344 22 23 L 22 7 Z M 8 10 L 10 10 L 10 22 L 8 22 Z M 12 10 L 14 10 L 14 22 L 12 22 Z M 16 10 L 18 10 L 18 22 L 16 22 Z" /></svg>
                            </Button>
                        </CardFooter>
                    </Form>
                )}
            </Formik>
        </Card>
    )

    return (
        <FlexBox minHeight="calc(100% - 100px)">
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.keys(boardData).map((status, idx) => (
                    <ListContainer key={status}>
                        <FlexBox justifyContent="space-between" alignItems="center">
                            <H3>{status}</H3>
                            <Hightlight>{boardData[status].length}</Hightlight>
                        </FlexBox>
                        <Button background={colors.darkGreenBg} color={colors.primaryButton} fontSize="24px" width="100%" onClick={() => toggleCreatorMode(status)}>+</Button>
                        <Droppable droppableId={status}>
                            {(provided, snapshot) => (
                                <Div
                                    height="100%"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {creatorMode === status ? (
                                        <CreateItem status={status} />
                                    ) : null}
                                    {boardData[status].map((item, index) => (
                                        <Draggable key={item._id} draggableId={item._id} index={index}>
                                            {(provided, snapshot) => (
                                                <Card
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    onClick={() => updateEditCard(item)}
                                                >
                                                    <CardHeader>{item.title}</CardHeader>
                                                    <CardBody>{item.description}</CardBody>
                                                </Card>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Div>
                            )}
                        </Droppable>
                    </ListContainer>
                ))}
            </DragDropContext>
            <CollapsableSideBar card={editCard} onClose={() => updateEditCard(null)} />
        </FlexBox >
    )

}

export default BoardList;
