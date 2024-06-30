import React, { useState } from "react";
import logo from "./Designer.png";

const Navbar = ({ search, setsearch , disab }) => {
  
  return (
    <div>
      <nav className="border-gray-200 bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
              CGPA Leaderboard
            </span>
          </a>
          <div className="flex md:order-2">
           
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              {<input
                type="text"
                id="search-navbar1"
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
                disabled = {!disab}
                className="block w-full p-2 pl-10 text-sm text-white border border-gray-600 rounded-lg bg-gray-800 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Regn. no"
              />}
            </div>
            
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
            <div className={`relative mt-3 md:hidden`}>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              {<input
                type="text"
                id="search-navbar"
                onChange={(e) => {
                  setsearch(e.target.value);
                  
                }}
                disabled = {!disab}
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />}
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-900 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-900 ">
              <li>
                <a
                  href="/"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mnkraj/cgpa_server"
                  className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-gray-900 dark:border-gray-700"
                >
                  Repository
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
