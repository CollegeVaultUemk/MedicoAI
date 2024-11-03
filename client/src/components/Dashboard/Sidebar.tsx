/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import {
  selectAiChat,
  GetAllAiChatsAction,
} from "@/state/reducers/aichatReducer";
import { Button } from "../ui/button";
import Logo from "../../assets/logo/updatedLogo.png";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const aiChats = useAppSelector(selectAiChat);
  const { loading, aiChat } = aiChats;
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const [chatsArray, setChatsArray] = useState<any[]>([]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    dispatch(GetAllAiChatsAction());
  }, [dispatch, aiChat?.data]);

  useEffect(() => {
    if (!loading && aiChat?.chats) {
      setChatsArray(aiChat.chats);
    }
  }, [loading, aiChat]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-blackTail duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/dashboard" || pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/dashboard/chat" ||
                            pathname === "/dashboard") &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.177,17.658c0,0,3.445,1.987,4.823,1.987c2.067,0,4.823-1.987,4.823-1.987c0.024-0.025,0.044-0.054,0.068-0.08H5.109C5.133,17.604,5.153,17.633,5.177,17.658z M8.622,1.583V0.531C6.496,0.973,2.539,2.521,1.376,7.933H0.699c-0.189,0-0.344,0.155-0.344,0.344v1.378C0.354,9.845,0.509,10,0.699,10h0.392c-0.016,0.224-0.026,0.454-0.033,0.689H0.699c-0.189,0-0.344,0.155-0.344,0.344v1.378c0,0.189,0.155,0.344,0.344,0.344h0.439c0.089,0.79,0.262,1.804,0.594,2.849v2.663H4.34c-2.233-2.449-2.264-6.822-2.264-7.01C2.077,4.052,6.353,2.108,8.622,1.583zM10.689,0.354H9.311v2.059h1.378V0.354z M11.378,2.63v0.472H8.622V2.63C6.612,3.147,3.11,4.951,3.11,11.258c0,0,0.004,3.373,1.47,5.632h4.042v-0.689h2.756v0.689h4.042c1.466-2.259,1.47-5.632,1.47-5.632C16.89,4.951,13.388,3.147,11.378,2.63z M5.005,12.035c-0.318-0.364-0.517-0.833-0.517-1.354S4.687,9.69,5.005,9.327V12.035zM6.383,10.026c-0.295,0.078-0.517,0.335-0.517,0.654c0,0.319,0.222,0.576,0.517,0.654v1.395c-0.384-0.032-0.738-0.163-1.033-0.377V9.008c0.296-0.214,0.649-0.345,1.033-0.377V10.026z M7.761,12.353c-0.296,0.214-0.649,0.345-1.033,0.377v-1.395C7.022,11.257,7.244,11,7.244,10.681c0-0.319-0.222-0.576-0.517-0.654V8.631c0.384,0.032,0.738,0.163,1.033,0.377V12.353zM8.105,12.035V9.327c0.318,0.363,0.517,0.833,0.517,1.354S8.423,11.671,8.105,12.035z M10,13.445l-1.378,0.689L10,12.756l1.378,1.378L10,13.445z M11.895,12.035c-0.318-0.364-0.517-0.833-0.517-1.354s0.199-0.991,0.517-1.354V12.035z M13.273,10.026c-0.295,0.078-0.517,0.335-0.517,0.654c0,0.319,0.222,0.576,0.517,0.654v1.395c-0.384-0.032-0.738-0.163-1.033-0.377V9.008c0.296-0.214,0.649-0.345,1.033-0.377V10.026z M14.651,12.353c-0.296,0.214-0.649,0.345-1.033,0.377v-1.395c0.295-0.078,0.517-0.335,0.517-0.654c0-0.319-0.222-0.576-0.517-0.654V8.631c0.384,0.032,0.738,0.163,1.033,0.377V12.353zM14.995,12.035V9.327c0.318,0.363,0.517,0.833,0.517,1.354S15.313,11.671,14.995,12.035z M19.646,9.656V8.278c0-0.189-0.155-0.344-0.344-0.344h-0.678c-1.163-5.413-5.12-6.96-7.246-7.402v1.052c2.269,0.525,6.545,2.469,6.545,9.675c0,0.188-0.031,4.561-2.264,7.01h2.608v-2.663c0.333-1.044,0.505-2.058,0.594-2.849h0.439c0.189,0,0.344-0.155,0.344-0.344v-1.378c0-0.189-0.155-0.344-0.344-0.344h-0.359c-0.007-0.235-0.017-0.465-0.033-0.689h0.392C19.491,10,19.646,9.845,19.646,9.656z"
                            fill=""
                          />
                        </svg>
                        AI Chats
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6 ">
                          <li>
                            <NavLink
                              to="/dashboard/chat"
                              className="flex justify-center items-center gap-2"
                            >
                              <Button
                                variant="outline"
                                className="text-white border-white w-[75%] justify-start"
                              >
                                <svg
                                  className="fill-current mr-2.5"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"
                                    fill=""
                                  />
                                </svg>
                                <div>New Chat</div>
                              </Button>
                              <div className="w-[15%] h-[35px] border rounded-md border-white">
                                <div className="w-[0.5px] h-full ml-[65%] border-[0.5px] border-white"></div>
                              </div>
                            </NavLink>
                          </li>
                          <div className="mt-4 flex flex-col gap-2.5 pl-6 max-h-[50vh] overflow-y-scroll">
                            {chatsArray.length > 0 &&
                              chatsArray.map((chats, index) => (
                                <li
                                  key={index}
                                  className=" w-[80%] h-full overflow-hidden rounded-md"
                                >
                                  <NavLink
                                    to={`/dashboard/chat/${chats._id}`}
                                    className={({ isActive }) =>
                                      "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                      (isActive && "!text-white bg-slate-600")
                                    }
                                  >
                                    {chats.chat[0].chatName.split(" ").length >
                                    3
                                      ? chats.chat[0].chatName
                                          .split(" ")
                                          .slice(0, 3)
                                          .join(" ") + "..."
                                      : chats.chat[0].chatName}
                                  </NavLink>
                                </li>
                              ))}
                          </div>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <NavLink
                  to="/dashboard/analysis"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    (pathname === "/analysis" ||
                      pathname.includes("analysis")) &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1.4em"
                    width="1.4em"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M135.3 373h753.1v493H135.3z" fill="#FFFFFF" />
                    <path
                      d="M880.5 365h16v16h-16zM864.8 381h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.3 0h-15.7v-16h15.7v16z m-31.4 0H755v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.3 0h-15.7v-16H708v16z m-31.4 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.3 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.4 0H504v-16h15.7v16z m-31.3 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16H457v16z m-31.4 0H410v-16h15.7v16z m-31.3 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.3 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.3 0h-15.7v-16h15.7v16z m-31.4 0H159v-16h15.7v16zM127.3 365h16v16h-16zM143.3 841.5h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.8h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16V710z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16V562h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4zM127.3 858h16v16h-16zM864.8 874h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.3 0h-15.7v-16h15.7v16z m-31.4 0H755v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.3 0h-15.7v-16H708v16z m-31.4 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.3 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.4 0H504v-16h15.7v16z m-31.3 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16H457v16z m-31.4 0H410v-16h15.7v16z m-31.3 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.3 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.4 0h-15.7v-16h15.7v16z m-31.3 0h-15.7v-16h15.7v16z m-31.4 0H159v-16h15.7v16zM880.5 858h16v16h-16zM896.5 841.5h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.8h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16V710z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16V562h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4z m0-32.9h-16v-16.4h16v16.4z"
                      fill="#0A0408"
                    />
                    <path d="M192.7 440.7h645.2v454.9H192.7z" fill="#EBB866" />
                    <path d="M71.9 864.5H952v83.9H71.9z" fill="#FFFFFF" />
                    <path
                      d="M959.9 956.4h-896v-99.9H960v99.9z m-880-16H944v-67.9H79.9v67.9z"
                      fill="#0A0408"
                    />
                    <path d="M314.5 334.1h84.4v319.7h-84.4z" fill="#55B7A8" />
                    <path
                      d="M406.9 661.8H306.5V326.1h100.4v335.7z m-84.4-16h68.4V342.1h-68.4v303.7z"
                      fill="#0A0408"
                    />
                    <path d="M475.3 145.7h84.4v508.1h-84.4z" fill="#DC444A" />
                    <path
                      d="M567.6 661.8H467.3V137.7h100.4v524.1z m-84.3-16h68.4V153.7h-68.4v492.1z"
                      fill="#0A0408"
                    />
                    <path d="M636 241.8h84.4v412H636z" fill="#68A4D9" />
                    <path
                      d="M728.4 661.8H628v-428h100.4v428z m-84.4-16h68.4v-396H644v396z"
                      fill="#0A0408"
                    />
                    <path d="M314.5 308.7h84.4v110.8h-84.4z" fill="#FFFFFF" />
                    <path
                      d="M406.9 427.5H306.5V300.7h100.4v126.8z m-84.4-16h68.4v-94.8h-68.4v94.8z"
                      fill="#0A0408"
                    />
                    <path d="M475.3 104h84.4v110.8h-84.4z" fill="#FFFFFF" />
                    <path
                      d="M567.6 222.8H467.3V96h100.4v126.8z m-84.3-16h68.4V112h-68.4v94.8z"
                      fill="#0A0408"
                    />
                    <path d="M636 223.3h84.4v110.8H636z" fill="#FFFFFF" />
                    <path
                      d="M728.4 342.1H628V215.3h100.4v126.8z m-84.4-16h68.4v-94.8H644v94.8z"
                      fill="#0A0408"
                    />
                    <path
                      d="M314.5 742.2h8v16h-8zM696.8 758.2h-15.6v-16h15.6v16z m-31.2 0H650v-16h15.6v16z m-31.2 0h-15.6v-16h15.6v16z m-31.2 0h-15.6v-16h15.6v16z m-31.2 0h-15.6v-16H572v16z m-31.2 0h-15.6v-16h15.6v16z m-31.1 0h-15.6v-16h15.6v16z m-31.2 0h-15.6v-16h15.6v16z m-31.2 0h-15.6v-16h15.6v16z m-31.2 0h-15.6v-16h15.6v16z m-31.2 0h-15.6v-16h15.6v16z m-31.2 0h-15.6v-16h15.6v16zM712.4 742.2h8v16h-8z"
                      fill="#0A0408"
                    />
                    <path d="M109.9 347.6h50.9v50.9h-50.9z" fill="#DC444A" />
                    <path
                      d="M168.8 406.5h-66.9v-66.9h66.9v66.9z m-50.9-16h34.9v-34.9h-34.9v34.9z"
                      fill="#0A0408"
                    />
                    <path d="M863.7 346.9h50.9v50.9h-50.9z" fill="#DC444A" />
                    <path
                      d="M922.6 405.7h-66.9v-66.9h66.9v66.9z m-50.9-16h34.9v-34.9h-34.9v34.9z"
                      fill="#0A0408"
                    />
                  </svg>
                  MHA Report
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname === "/" && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1.4em"
                    width="1.4em"
                  >
                    <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
                  </svg>
                  Home
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
