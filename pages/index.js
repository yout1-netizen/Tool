"use client"; // ensure client-side execution

import { useState, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export default function Home() {
  const [ffmpeg, setFfmpeg] = useState(null);
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState(null);
  const [output, setOutput] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Load ffmpeg once
  useEffect(() => {
    const load = async () => {
      const ffmpegInstance = new FFmpeg();
      await ffmpegInstance.load();
      setFfmpeg(ffmpegInstance);
      setReady(true);
    };
    load();
  }, []);

  // Handle conversion
  const convertToMp3 = async () => {
    if (!video || !ffmpeg) return;
    setProcessing(true);

    // Write uploaded file to FS
    await ffmpeg.writeFile("input.mp4", await fetchFile(video));

    // Run ffmpeg command
    await ffmpeg.exec(["-i", "input.mp4", "output.mp3"]);

    // Read output
    const data = await ffmpeg.readFile("output.mp3");

    // Create blob URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: "audio/mpeg" }));
    setOutput(url);

    setProcessing(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>YouTube to MP3 (Local & Private)</h1>

      {!ready && <p>Loading engine (first run may take 20–30s)...</p>}

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files?.item(0))}
        style={{ margin: "1rem" }}
      />

      <button
        onClick={convertToMp3}
        disabled={!video || processing || !ready}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#0070f3",
          color: "white",
          cursor: "pointer"
        }}
      >
        {processing ? "Processing..." : "Convert to MP3"}
      </button>

      {output && (
        <div style={{ marginTop: "1rem" }}>
          <a href={output} download="output.mp3">
            Download MP3
          </a>
        </div>
      )}
    </div>
  );
}
