import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteUser, getUsersByProjectId } from "../../../../../actions/project";
import { AppDispatch } from "../../../../../config/store";
import { projectsSliceSelectors } from "../../../../../slices/Projects/projectsSlice";
import DeleteModal from "../../../../Global/DeleteModal";
import Modal from "../../../../Global/Modal";
import AddUserForm from "../../Users/AddUserForm";

import Card from "../Card";

export default function UsersList() {
  const users = useSelector(projectsSliceSelectors.projectUsers);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { id: projectId } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteUser = () => {
    if (projectId && userId) {
      const onDone = () => {
        dispatch(getUsersByProjectId(projectId));
        setDeleteModalOpen(false);
      };
      dispatch(deleteUser({ data: { projectId, userId }, onDone }));
    }
  };

  const handleOpenDeleteModal = (userId: string) => {
    setDeleteModalOpen(true);
    setUserId(userId);
  };

  return (
    <>
      <div className="card flex flex-col w-full lg:w-[calc(50%_-_0.9rem)] xl:w-[calc(33%_-_0.8rem)] h-full p-4 bg-neutral-focus">
        <div className="flex gap-2">
          <h2 className="text-2xl mb-4 text-neutral-content">Team</h2>
          <div className="divider w-full h-1 before:bg-gradient-to-r before:from-primary before:to-neutral-focus after:bg-neutral-focus" />
          <button onClick={() => setAddModalOpen(true)} className="btn btn-success btn-sm">
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
        {users.length > 0 ? (
          <div className="overflow-y-auto">
            {users
              .map((user, i) => (
                <Card
                  key={user._id}
                  type="user"
                  title={`${user.firstname} ${user.lastname}`}
                  subtitle={user.email}
                  icon={
                    i % 2 === 0
                      ? "https://placeimg.com/192/192/people"
                      : "https://placeimg.com/191/192/people/grayscale"
                  }
                  onRemove={() => handleOpenDeleteModal(user._id)}
                />
              ))
              .reverse()}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-content">No users found.</div>
        )}
      </div>
      {addModalOpen && (
        <Modal visibleOverflow hideButton title="Add user" setOpen={setAddModalOpen} open={addModalOpen}>
          <AddUserForm onDone={() => setAddModalOpen(false)} />
        </Modal>
      )}
      {deleteModalOpen && (
        <DeleteModal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          onDelete={handleDeleteUser}
          entityName="user"
        />
      )}
    </>
  );
}
