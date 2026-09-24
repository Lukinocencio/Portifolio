
"use client";
import React from "react";
import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

export default function GithubCalendarComponent() {
  return (
    <div className="github-calendar-wrapper" style={{ marginTop: "40px", width: "100%", overflowX: "auto", paddingBottom: "15px" }}>
      <div style={{ display: "table", margin: "0 auto", padding: "0 15px" }}>
        <GitHubCalendar username="Lukinocencio" colorScheme="dark" />
      </div>
    </div>
  );
}

