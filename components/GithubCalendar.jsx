
"use client";
import React from "react";
import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

export default function GithubCalendarComponent() {
  return (
    <div className="github-calendar-container" style={{ display: "flex", justifyContent: "center", marginTop: "40px", width: "100%", overflowX: "auto" }}>
      <GitHubCalendar username="Lukinocencio" colorScheme="dark" />
    </div>
  );
}

