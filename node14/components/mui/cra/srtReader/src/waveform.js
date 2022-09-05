import React, { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js'

import './waveform.css';

export default function WaveForm(prop) {
  if (prop.audioFilePath) {
    
    useEffect(() => {
      if (prop.waveDiv.current && prop.timelineDiv.current) {
        const wavesurfer = WaveSurfer.create({
          container: prop.waveDiv.current,
          interact: false,
          // waveColor: 'violet',
          // progressColor: 'blue',
          fillParent: false,
          scrollParent: true,
          minPxPerSec: 75, 
          plugins: [
            RegionsPlugin.create({
              regions: prop.regions
            }),
            TimelinePlugin.create({
              container: prop.timelineDiv.current
            })
          ],
          // xhr: { 
          //   cache: 'default', 
          //   mode: 'no-cors', 
          //   method: 'GET', 
          //   credentials: 'same-origin', 
          //   redirect: 'follow', 
          //   referrer: 'client', 
          //   headers: [ { 
          //     key: 'Access-Control-Allow-Origin', value: '*' 
          //   } ]
          // }
        });

        wavesurfer.load(prop.audioFilePath)
        wavesurfer.setMute(true);
        wavesurfer.on('ready', prop.waveDrawnReady);
        prop.setWavesurfer(wavesurfer)
      }
    }, []);
  }

  return (
    <React.Fragment>
      <div ref={prop.waveDiv}>
      </div>
      <div ref={prop.timelineDiv}>
      </div>
    </React.Fragment>
  );
}
