import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppTheme } from "../types/global";
import { authSliceSelectors } from "../slices/Auth/authSlice";
import { login, logout } from "../actions/auth";
import { AppDispatch } from "../config/store";
import { getTheme } from "../utils";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

interface Props {
  component: FC;
}
export const DefaultLayout = ({ component: Component }: Props) => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<string>(getTheme());
  const token = useSelector(authSliceSelectors.token);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login());
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div data-theme={theme}>
      <Sidebar open={open} onClose={handleClose} onLogout={handleLogout}>
        <div className="navbar bg-base-300 fixed top-0 z-10">
          <div className="flex-1 ml-2">
            {token && (
              <div onClick={() => setOpen(true)} className="btn btn-ghost drawer-button hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </div>
            )}
            <div
              onClick={() => navigate("/")}
              className="ml-4 normal-case text-xl font-mono font-thin cursor-pointer hover:text-current"
            >
              Data<span className="text-primary-focus font-bold">Labeling</span>
            </div>
          </div>
          <div className="flex-none mr-2">
            <ul className="menu menu-horizontal p-0 z-20">
              <li>
                <div>
                  {theme}
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </div>
                <ul className="p-2 bg-base-100">
                  {Object.values(AppTheme).map((item) => (
                    <li
                      className={`${item === theme ? "bg-primary-focus" : ""}`}
                      key={item}
                      onClick={() => handleThemeChange(item)}
                    >
                      <div>{item}</div>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
          <div className="flex-none mr-2">
            <button onClick={!token ? handleLogin : handleLogout} className="btn btn-primary">
              {token ? "Logout" : "Login"}
            </button>
          </div>
        </div>
        <div
          className={`flex w-full min-h-[calc(100vh_-_64px)] justify-center align-items-center duration-100 pt-16 ${
            open && "ml-[320px] w-[calc(100vw_-_320px)]"
          }`}
        >
          <Component />
        </div>
      </Sidebar>
    </div>
  );
};
