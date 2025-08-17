import Link from 'next/link'
export default function Post(){
  return (
    <div style={maxWidth:900,margin:'24px auto',padding:16}>
      <h1>Increase Audio Quality for Voiceovers — Simple Tips</h1>
      <p style={color:'#374151'}>Record in a quiet room, use a pop filter, normalize and limit peaks, and export at 44.1kHz or 48kHz. Use our browser tool to trim and export clean MP3s.</p>
      <p><Link href='/blog'><a>← Back to blog</a></Link></p>
    </div>
  )
}
