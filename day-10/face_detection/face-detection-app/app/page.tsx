'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }
    checkSession();
  }, []);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const oldCanvas = containerRef.current?.querySelector('canvas');
    if (oldCanvas) oldCanvas.remove();
    setStatus('');

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  async function detectFaces() {
    if (!imgRef.current) return;
    setStatus('Loading face detection models...');

    try {
      if (!(window as any).faceapi) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/dist/face-api.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      const faceapi = (window as any).faceapi;

      const MODEL_URL = 'https://vladmandic.github.io/face-api/model/';
      if (!faceapi.nets.tinyFaceDetector.isOpenCvReady) {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      }

      setStatus('Detecting faces...');

      const img = imgRef.current;
      
      const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());

      if (detections.length === 0) {
        setStatus('No faces detected.');
        return;
      }

      const oldCanvas = containerRef.current?.querySelector('canvas');
      if (oldCanvas) oldCanvas.remove();

      const canvas = faceapi.createCanvasFromMedia(img);
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      
      containerRef.current?.appendChild(canvas);

      const displaySize = { width: img.clientWidth, height: img.clientHeight };
      faceapi.matchDimensions(canvas, displaySize);

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      
      faceapi.draw.drawDetections(canvas, resizedDetections);
      setStatus(`Success! Detected ${detections.length} face(s).`);

    } catch (err) {
      console.error(err);
      setStatus('Error running face detection.');
    }
  }

  if (loadingUser) {
    return <div style={{ padding: '20px' }}>Loading application...</div>;
  }

  if (!user) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Face Recognition Assignment App</h1>
        <p>Please <Link href="/login">Login</Link> or <Link href="/signup">Sign Up</Link> to use the dashboard.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <h1>Face Detection Dashboard</h1>
      <p style={{ color: 'gray' }}>Upload an image to locate faces instantly using the browser API.</p>

      <div style={{ margin: '20px 0' }}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      {imageSrc && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div ref={containerRef} style={{ position: 'relative', width: 'fit-content' }}>
            <img 
              ref={imgRef}
              src={imageSrc} 
              alt="Upload preview" 
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }} 
            />
          </div>

          <div>
            <button onClick={detectFaces} style={{ padding: '8px 16px', cursor: 'pointer' }}>
              Detect Faces
            </button>
          </div>
        </div>
      )}

      {status && (
        <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#0070f3' }}>
          {status}
        </p>
      )}
    </div>
  );
}