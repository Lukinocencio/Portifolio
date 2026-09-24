
"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

export default function GithubCalendarComponent() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="github-calendar-wrapper" style={{ marginTop: "40px", width: "100%", overflowX: "auto", paddingBottom: "15px" }}>
      <div style={{ display: "table", margin: "0 auto", padding: "0 15px", color: theme === "dark" ? "#fff" : "#000" }}>
        <GitHubCalendar 
          username="Lukinocencio" 
          colorScheme={theme} 
          labels={{
            totalCount: t.calendar_total,
            legend: {
              less: t.calendar_less,
              more: t.calendar_more
            }
          }}
        />
      </div>
    </div>
  );
}

