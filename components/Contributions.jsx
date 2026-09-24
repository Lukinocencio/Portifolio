"use client";
import React from "react";
import GithubCalendarComponent from "./GithubCalendar";
import { useLanguage } from "@/context/LanguageContext";

export default function Contributions() {
  const { t } = useLanguage();

  return (
    <section id="contributions" className="contributions">
      <div className="contributions__content max-width">
        <h2 className="secondary-title">{t.contributions_title}</h2>
        <p className="description">{t.contributions_desc}</p>
      </div>
      
      <GithubCalendarComponent />
    </section>
  );
}
