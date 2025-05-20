import { useState, useRef, useEffect, createElement } from 'react'
import { GoDownload } from "react-icons/go"
import { FcDownload } from "react-icons/fc";
import { RiVideoDownloadFill } from "react-icons/ri"
import { BsMusicNote } from "react-icons/bs"
import LogoSVG from './LogoSVG'
import './App.css'

function App() {
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  async function download(params) {
    if (!params) {
      setMessage('Erro ao baixar conteúdo, tente novamente.');
      return;
    }

    const url = `https://linkripper-back.vercel.app/${params}?url=${link}`;
    const response = await fetch(url, {method: 'GET'});

    const blob = await response.blob();

    const disposition = response.headers.get('Content-Disposition')
    const rawFilename = disposition?.split('filename=')[1]?.split(';')[0]?.trim();
    const filename = rawFilename?.replace(/"/g, '') || 'arquivo-baixado';
    console.log(filename)

    const downloadURL = URL.createObjectURL(blob)
    const a = document.createElement('a');
    a.href = downloadURL;
    a.download = filename;
    a.click();
    a.remove();
    URL.revokeObjectURL(downloadURL);
  };

  useEffect(() => {}, [error])

  return (
    <>
      <main className="app-main">
        <LogoSVG />

        <div className="div-input">
          <GoDownload className='download-icon' />
          <input autoFocus={true} 
            type="text" 
            value={link}
            onChange={e => setLink(e.target.value)}
            placeholder='Insira o link do vídeo aqui' />
        </div>

        <div className='icons-box'>
          <div className='icon-div'>
            <BsMusicNote id='music-icon' className='download-icon' title='Baixar áudio' onClick={() => download('music')} />
            Baixar Áudio
          </div>

          <div className='icon-div'>
            <RiVideoDownloadFill id='video-icon' className='download-icon' title='Baixar vídeo' onClick={() => download('video')} />
            
            Baixar Vídeo
          </div>
        </div>
      </main>
    </>
  )
}

export default App
