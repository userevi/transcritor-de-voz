import React, { use, useEffect, useState } from 'react'
import { YoutubeTranscript } from 'youtube-transcript'

const useYoutubeTranscripts = () => {
  const [transcripts, setTranscripts] = useState<string[]>([])
  
  const getTranscripts = async (youtubeUrl: string) => {
    const data = await fetch('/api/youtube', {
      method: 'POST',
      body: JSON.stringify({ youtubeUrl }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => res.data.map((item: any) => item?.text))

    setTranscripts(data)
  }

  return {
    getTranscripts,
    transcripts,
  }
}

export default useYoutubeTranscripts