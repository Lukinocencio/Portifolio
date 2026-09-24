
"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function SpotifyPlaying() {
  const [data, setData] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchSpotify = () => {
      fetch("/api/spotify")
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.error(err));
    };

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30000); // 30s
    return () => clearInterval(interval);
  }, []);

  if (!data || !data.isPlaying) return null;

  return (
    <div className="spotify-playing">
      <div className="spotify-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{color: "#1DB954"}}><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.66.301 1.02zM19.08 14.1c-.301.42-.84.6-1.26.3-3.24-1.98-8.16-2.52-11.94-1.38-.54.18-1.08-.12-1.26-.6-.18-.54.12-1.08.6-1.26 4.32-1.26 9.72-.66 13.56 1.68.42.24.6.84.3 1.26zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.66.18-1.32-.18-1.5-.84-.18-.66.18-1.32.84-1.5 4.32-1.32 11.28-1.02 15.72 1.62.6.36.78 1.14.42 1.74-.36.6-1.14.78-1.74.42z"/></svg>
      </div>
      <div className="spotify-info">
        <p className="spotify-status">{t.spotify_listening || "Ouvindo agora no Spotify:"}</p>
        <a href={data.songUrl} target="_blank" rel="noopener noreferrer" className="spotify-song">
          {data.title} - {data.artist}
        </a>
      </div>
    </div>
  );
}

