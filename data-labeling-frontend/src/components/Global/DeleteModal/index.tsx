import React, { useMemo, useState } from "react";
import Modal from "../Modal";

export type DeleteModalProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	entityName: string;
	onDelete: () => void;
};

export default function DeleteModal({ open, setOpen, entityName, onDelete }: DeleteModalProps) {
	const [deleteConfirmText, setDeleteConfirmText] = useState("");
	const isConfirmed = useMemo(() => {
		if (deleteConfirmText === "DELETE") {
			return true;
		}
		return false;
	}, [deleteConfirmText]);

	const handleCancel = () => {
		setOpen(false);
		setDeleteConfirmText("");
	};

	const handleDelete = () => {
		onDelete();
		setDeleteConfirmText("");
	};

	const handleTyping = (value: string) => {
		setDeleteConfirmText(value);
	};

	return (
		<Modal
			open={open}
			setOpen={setOpen}
			name={`delete-${entityName}`}
			title={`Delete ${entityName}`}
			hideButton
			onClose={handleCancel}
		>
			<div className="flex flex-col align-middle justify-center">
				<div>{`Are you sure you want to delete this ${entityName}?`}</div>
				<div className="mt-8 mb-2">
					Please type <b>DELETE</b> to confirm.
				</div>
				<div>
					<input
						value={deleteConfirmText}
						onChange={(e) => handleTyping(e.target.value)}
						className={`input w-full input-bordered focus:border-error ${
							isConfirmed && "text-error border-error"
						}`}
					/>
				</div>
				<div className="flex justify-end mt-6 gap-2">
					<button onClick={handleCancel} className={`btn btn-primary ${!isConfirmed && "btn-outline"}`}>
						Cancel
					</button>
					<button disabled={!isConfirmed} onClick={handleDelete} className="btn btn-error btn-outline">
						Delete
					</button>
				</div>
			</div>
		</Modal>
	);
}
