import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteMetadata } from "../../../../../actions/metadata";
import { AppDispatch } from "../../../../../config/store";
import { setEditMetadata } from "../../../../../slices/Metadata/metadataSlice";
import DeleteModal from "../../../../Global/DeleteModal";
import Modal from "../../../../Global/Modal";
import CreateEditMetadataForm from "../../Metadata/CreateEditMetadataForm";
import Card from "../Card";
import { projectsSliceSelectors } from "../../../../../slices/Projects/projectsSlice";

export default function MetadataList() {
  const metadata = useSelector(projectsSliceSelectors.projectMetadata);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [metadataId, setMetadataId] = useState<string | null>(null);
  const { id: projectId } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteMetadata = () => {
    if (projectId && metadataId) {
      const onDone = () => {
        setDeleteModalOpen(false);
      };
      dispatch(deleteMetadata({ projectId, metadataId, onDone }));
    }
  };

  const handleOpenDeleteModal = (metadataId: string) => {
    setDeleteModalOpen(true);
    setMetadataId(metadataId);
  };

  const handleEdit = (metadataId: string) => {
    const editMetadata = metadata.find((metadata) => metadata._id === metadataId);
    if (!editMetadata) return;
    dispatch(setEditMetadata(editMetadata));
    setCreateModalOpen(true);
  };

  return (
    <>
      <div className="card flex flex-col w-full lg:w-[calc(50%_-_0.9rem)] xl:w-[calc(33%_-_0.8rem)] h-full p-4 bg-neutral-focus">
        <div className="flex gap-2">
          <h2 className="text-2xl mb-4 text-neutral-content">Metadata</h2>
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
        {metadata.length > 0 ? (
          <div className="overflow-y-auto">
            {metadata
              .map((meta) => (
                <Card
                  key={meta._id}
                  type="metadata"
                  title={meta.name}
                  subtitle={meta.type}
                  onRemove={() => handleOpenDeleteModal(meta._id)}
                  onEdit={() => handleEdit(meta._id)}
                />
              ))
              .reverse()}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-content">No metadata found.</div>
        )}
      </div>
      {createModalOpen && (
        <Modal visibleOverflow hideButton title="Add metadata" setOpen={setCreateModalOpen} open={createModalOpen}>
          {/* Overflow visible added because of the dropdown inside the modal*/}
          <CreateEditMetadataForm onDone={() => setCreateModalOpen(false)} />
        </Modal>
      )}
      {deleteModalOpen && (
        <DeleteModal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          onDelete={handleDeleteMetadata}
          entityName="metadata"
        />
      )}
    </>
  );
}
