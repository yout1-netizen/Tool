import dynamic from 'next/dynamic'
import { useState, useRef } from 'react'
import AdsenseBanner from '../components/AdsenseBanner'

export default function Home(){
  const [ready,setReady]=useState(false)
  const [loadingMsg,setLoadingMsg]=useState('')
  const [file,setFile]=useState(null)
  const [outUrl,setOutUrl]=useState('')
  const [isConverting,setIsConverting]=useState(false)
  const ffmpegRef=useRef(null)

  const loadFFmpeg = async ()=>{
    if(ready) return
    setLoadingMsg('Loading engine (first run may take a few seconds)...')
    const { createFFmpeg } = await import('@ffmpeg/ffmpeg')
    ffmpegRef.current = createFFmpeg({ log: false })
    await ffmpegRef.current.load()
    setReady(true)
    setLoadingMsg('')
  }

  const onFile = async (e) => {
    const f = e.target.files[0]
    if(!f) return
    setFile(f)
    if(!ready) await loadFFmpeg()
  }

  const convert = async ()=>{
    if(!file || !ffmpegRef.current) return
    setIsConverting(true)
    const name = 'input' + (file.name.includes('.')?file.name.slice(file.name.lastIndexOf('.')):'.mp4')
    const data = await file.arrayBuffer()
    await ffmpegRef.current.FS('writeFile', name, new Uint8Array(data))
    await ffmpegRef.current.run('-i', name, '-vn', '-acodec', 'libmp3lame', '-b:a', '192k', 'out.mp3')
    const out = ffmpegRef.current.FS('readFile', 'out.mp3')
    const blob = new Blob([out.buffer], {type:'audio/mpeg'})
    const url = URL.createObjectURL(blob)
    setOutUrl(url)
    setIsConverting(false)
  }

  return (
    <div className="container">
      <div className="card">
        <h1>MediaToolkit — Video → MP3 (Privacy-first)</h1>
        <p className="small-muted">All processing runs in the browser (no uploads). Works offline after initial load.</p>
        <div style={{marginTop:16}}>
          <input className="input" type="file" accept="video/*" onChange={onFile} />
        </div>
        {file && <div style={{marginTop:8}} className="small-muted">Selected: {file.name} — {(Math.round(file.size/1024/1024*10)/10)} MB</div>}
        <div style={{marginTop:12,display:'flex',gap:8}}>
          <button className="button" onClick={convert} disabled={!file || isConverting}>{isConverting? 'Converting...':'Convert to MP3'}</button>
          {!ready && <button className="button" style={{background:'#6b7280'}} onClick={loadFFmpeg}>{loadingMsg || 'Preload engine'}</button>}
        </div>
        {outUrl && <div style={{marginTop:12}}><audio controls src={outUrl}></audio><div style={{marginTop:8}}><a className="button" href={outUrl} download={(file?.name||'track') + '.mp3'}>Download MP3</a></div></div>}
      </div>

      <div style={{marginTop:16}} className="card"><AdsenseBanner/></div>

      <div style={{marginTop:16}} className="card">
        <h2>Why this tool?</h2>
        <ul>
          <li className="small-muted">Privacy-first (no uploads).</li>
          <li className="small-muted">Low cost — runs in user browser.</li>
          <li className="small-muted">Great for creators sharing clips and audio.</li>
        </ul>
      </div>

    </div>
  )
}
