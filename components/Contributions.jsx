"use client";
import React from "react";
import GithubCalendarComponent from "./GithubCalendar";

export default function Contributions() {
  return (
    <section id="contributions" className="contributions">
      <div className="contributions__content max-width">
        <h2 className="secondary-title">Minhas contribuições</h2>
        <p className="description">Acompanhe meu histórico de atividades e contribuições no GitHub.</p>
      </div>
      
      <GithubCalendarComponent />
    </section>
  );
}
