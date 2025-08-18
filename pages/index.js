import { useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

export default function Home() {
  const [ffmpeg] = useState(() => createFFmpeg({ log: true }));
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  // Load ffmpeg.wasm
  const load = async () => {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
      setReady(true);
    }
  };

  const convertToMp3 = async () => {
    if (!video) return alert("Please upload a video first");

    // Write file into memory
    ffmpeg.FS("writeFile", "input.mp4", await fetchFile(video));

    // Run ffmpeg command
    await ffmpeg.run("-i", "input.mp4", "output.mp3");

    // Read result
    const data = ffmpeg.FS("readFile", "output.mp3");

    // Create a URL for download
    const url = URL.createObjectURL(new Blob([data.buffer], { type: "audio/mp3" }));
    setAudioUrl(url);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Video to MP3 Converter</h1>
      {!ready ? (
        <button onClick={load}>Load Converter</button>
      ) : (
        <>
          <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))} />
          <button onClick={convertToMp3}>Convert to MP3</button>
          {audioUrl && (
            <a href={audioUrl} download="output.mp3">
              Download MP3
            </a>
          )}
        </>
      )}
    </div>
  );
}
