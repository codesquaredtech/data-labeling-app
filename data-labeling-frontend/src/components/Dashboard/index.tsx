import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSliceSelectors } from "../../slices/Auth/authSlice";
import LoadingSpinner from "../Global/LoadingSpinner";
import { Size } from "../Global/LoadingSpinner/types";

export const Dashboard = () => {
  const isLoading = useSelector(authSliceSelectors.loading);
  const user = useSelector(authSliceSelectors.user);
  const role = user ? (user.isAdmin ? "Admin" : "User") : "Unknown";
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-center align-items-center">
      <div className="card w-5/12 bg-neutral text-neutral-content">
        {isLoading ? (
          <div className="flex w-full h-full align-middle justify-center">
            <LoadingSpinner size={Size.XL} />
          </div>
        ) : (
          <div className="card-body text-center items-center">
            <div className="divider mb-6 before:bg-gradient-to-r before:from-primary after:bg-gradient-to-l after:from-primary">
              <h2 className="card-title text-2xl text-neutral-content">Dashboard</h2>
            </div>
            {user ? (
              <>
                <div className="mt-6">
                  Hello {user?.displayName || "user"}, your role is {role} and you can
                  {user?.isAdmin ? " create and" : ""} label the data.
                </div>
                <div className="card-actions justify-center w-full">
                  {user?.isAdmin && (
                    <button
                      className="btn btn-outline btn-primary mt-4 lg:w-52 md:w-full"
                      onClick={() => navigate("/admin/projects")}
                    >
                      Create the data
                    </button>
                  )}
                  <button
                    className="btn btn-outline btn-primary mt-4 lg:w-52 md:w-full"
                    onClick={() => navigate("/user/projects")}
                  >
                    Label the data
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-6">An error has occurred fetching your data. Please reload and try again.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
