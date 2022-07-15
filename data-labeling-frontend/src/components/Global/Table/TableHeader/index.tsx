import React, { useRef } from "react";
import { ColumnInstance } from "react-table";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Filter } from "./filters";
import { TableHeaderProps } from "../types";
import "./styles/tableHeader.scss";

const TableHeader = ({ headerGroups, setColumnOrder, allColumns }: TableHeaderProps) => {
	const currentColOrder = useRef<string[]>([]);

	const generateSortingIndicator = (column: ColumnInstance<object>) => {
		return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
	};

	const getItemStyle = ({ isDragging, isDropAnimating }: any, draggableStyle: any) => ({
		...draggableStyle,
		// some basic styles to make the draggable items look a bit nicer
		userSelect: "none",

		// change background colour if dragging
		background: isDragging ? "#b2dfdb" : "",

		...(!isDragging && { transform: "translate(0,0)" }),
		...(isDropAnimating && { transitionDuration: "0.001s" }),

		// styles we need to apply on draggables
	});

	return (
		<div className="header">
			{headerGroups.map((headerGroup, index) => (
				// @ts-ignore
				<DragDropContext
					onDragStart={() => {
						currentColOrder.current = allColumns.map((o) => o.id);
					}}
					onDragUpdate={(dragUpdateObj, b) => {
						const colOrder = [...currentColOrder.current];
						const sIndex = dragUpdateObj.source.index;
						const dIndex = dragUpdateObj.destination && dragUpdateObj.destination.index;

						if (typeof sIndex === "number" && typeof dIndex === "number") {
							colOrder.splice(sIndex, 1);
							colOrder.splice(dIndex, 0, dragUpdateObj.draggableId);
							setColumnOrder(colOrder);
						}
					}}
					key={index}
				>
					<Droppable droppableId="droppable" direction="horizontal">
						{(droppableProvided, snapshot) => (
							<div {...headerGroup.getHeaderGroupProps()} ref={droppableProvided.innerRef} className="tr">
								{headerGroup.headers.map((column, index) => (
									<Draggable
										key={column.id}
										draggableId={column.id}
										index={index}
										// @ts-ignore
										isDragDisabled={!column.accessor}
									>
										{(provided, snapshot) => {
											return (
												<div {...column.getHeaderProps()} className="th">
													<div
														{...column.getSortByToggleProps()}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														// {...extraProps}
														ref={provided.innerRef}
														style={{
															...getItemStyle(snapshot, provided.draggableProps.style),
															// ...style
														}}
													>
														{column.render("Header")}
														{/* Use column.getResizerProps to hook up the events correctly */}

														{generateSortingIndicator(column)}
													</div>
													{column.canResize && (
														<div {...column.getResizerProps()} className={`resizer`} />
													)}
													{column.canFilter ? <Filter column={column} /> : null}
												</div>
											);
										}}
									</Draggable>
								))}
								{/* {droppableProvided.placeholder} */}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			))}
		</div>
	);
};

export default TableHeader;
