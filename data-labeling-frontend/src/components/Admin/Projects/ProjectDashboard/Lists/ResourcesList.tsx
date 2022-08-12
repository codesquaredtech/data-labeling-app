import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteResource, getResourcesByProjectId } from "../../../../../actions/resource";
import { AppDispatch } from "../../../../../config/store";
import { resourcesSliceSelectors, setEditResource } from "../../../../../slices/Resources/resourcesSlice";
import DeleteModal from "../../../../Global/DeleteModal";
import Modal from "../../../../Global/Modal";
import CreateEditResourceForm from "../../Resources/CreateEditResourceForm";
import Card from "../Card";

export default function ResourcesList() {
	const resources = useSelector(resourcesSliceSelectors.resourceList);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [resourceId, setResourceId] = useState<string | null>(null);
	const { id: projectId } = useParams();

	const dispatch = useDispatch<AppDispatch>();

	const handleDeleteResource = () => {
		if (!projectId || !resourceId) return;
		const onDone = () => {
			dispatch(getResourcesByProjectId(projectId));
			setDeleteModalOpen(false);
		};
		dispatch(deleteResource({ resourceId, onDone }));
	};

	const handleOpenDeleteModal = (resourceId: string) => {
		setDeleteModalOpen(true);
		setResourceId(resourceId);
	};

	const handleEdit = (resourceId: string) => {
		const editResource = resources.find((resource) => resource._id === resourceId);
		if (!editResource) return;
		dispatch(setEditResource(editResource));
		setCreateModalOpen(true);
	};

	return (
		<>
			<div className="card flex flex-col w-full lg:w-[calc(50%_-_0.9rem)] xl:w-[calc(33%_-_0.8rem)] h-full p-4 bg-neutral-focus">
				<div className="flex gap-2">
					<h2 className="text-2xl mb-4 text-neutral-content">Resource</h2>
					<div className="divider w-full h-1 before:bg-gradient-to-r before:from-primary before:to-neutral-focus after:bg-neutral-focus" />
					<button onClick={() => setCreateModalOpen(true)} className="btn btn-success btn-sm">
						Add
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							fill="currentColor"
							className="bi bi-plus"
							viewBox="0 0 16 16"
						>
							<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
						</svg>
					</button>
				</div>
				{resources.length > 0 ? (
					<div className="overflow-y-auto">
						{resources
							.map((resource) => (
								<Card
									key={resource._id}
									type="resource"
									title={resource.title}
									subtitle={resource.text}
									onRemove={() => handleOpenDeleteModal(resource._id)}
									onEdit={() => handleEdit(resource._id)}
								/>
							))
							.reverse()}
					</div>
				) : (
					<div className="flex items-center justify-center h-full text-neutral-content">
						No resources found.
					</div>
				)}
			</div>
			{createModalOpen && (
				<Modal hideButton title="Add resource" setOpen={setCreateModalOpen} open={createModalOpen}>
					<CreateEditResourceForm onDone={() => setCreateModalOpen(false)} />
				</Modal>
			)}
			{deleteModalOpen && (
				<DeleteModal
					open={deleteModalOpen}
					setOpen={setDeleteModalOpen}
					onDelete={handleDeleteResource}
					entityName="resource"
				/>
			)}
		</>
	);
}
