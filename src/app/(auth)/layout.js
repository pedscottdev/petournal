"use client"; 
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import "../globals.css";

export default function AuthLayout({ children }) {
  return (
      <body>
        <div>
          {children}
        </div>   
        <ProgressBar
          height="4px"
          color="#9B66FD"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </body>
  );
}