import React from "react";
import "./styles/globals.css";
import "./styles/index.min.css";

export const metadata = {
  title: "Nouveau project",
  description: "",
};

export default function ({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
