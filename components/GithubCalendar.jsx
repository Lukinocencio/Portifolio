
"use client";
import React from "react";
import { GitHubCalendar } from "react-github-calendar";

export default function GithubCalendarComponent() {
  return (
    <div className="github-calendar-container" style={{ display: "flex", justifyContent: "center", marginTop: "40px", width: "100%", overflowX: "auto" }}>
      <GitHubCalendar username="Lukinocencio" colorScheme="dark" />
    </div>
  );
}

