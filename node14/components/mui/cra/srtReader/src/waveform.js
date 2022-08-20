import React, { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js'

import './waveform.css';

export default function WaveForm(prop) {
  if (prop.videoFilePath) {
    useEffect(() => {
      if (prop.wave.current && prop.timeline.current) {
        const wavesurfer = WaveSurfer.create({
          container: prop.wave.current,
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
              container: prop.timeline.current
            })
          ]
        });

        wavesurfer.load(prop.videoFilePath)
      }
    }, []);
  }

  return (
    <React.Fragment>
      <div ref={prop.wave}>
      </div>
      <div ref={prop.timeline}>
      </div>
    </React.Fragment>
  );
}
