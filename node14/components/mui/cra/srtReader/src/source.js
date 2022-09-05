import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ResponsiveContainer } from 'recharts';
import Box from '@mui/material/Box';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import YouTubeIcon from '@mui/icons-material/YouTube';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import TextField from '@mui/material/TextField';
import getVideoId from 'get-video-id';
import LockIcon from '@mui/icons-material/Lock';
// import { getSubtitles } from 'youtube-captions-scraper';
import intl from 'react-intl-universal';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SourceDialog(props) {
  const { onClose, open } = props;
  const [value, setValue] = React.useState(0);
  const [ytErrorTxt, setYtErrorTxt] = React.useState('');
  const [isYtUrlVaild, setYtUrlVaild] = React.useState(false);
  const [ytUrl, setYtUrl] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    onClose();
  };

  function handleMp4Load({target}) {
    if (target.files.length < 1) {
      return
    }

    const selectedFile = target.files[0];
    const url = URL.createObjectURL(selectedFile)

    props.setVideoHeight('100%')
    props.setVideoControls(false);
    props.setVideoFilePath(url);
    props.setAudioFilePath(url);

    if (props.objWavesurfer) {
      props.objWavesurfer.load(url)
    }

    onClose();
  }

  function checkYtUrl(url) {
    const {id} = getVideoId(url);
    if (id) {
      return true;
    }

    return false;
  }

  function handleYtChange(event) {
    const url = event.target.value;
    setYtUrl(url)

    if (checkYtUrl(url)) {
      setYtErrorTxt('')
      setYtUrlVaild(true)
    } else {
      setYtErrorTxt(intl.get('invalid_youtube_url'))
      setYtUrlVaild(false)
    }
  }

  function handleYoutubeLoad() {
    const { id } = getVideoId(ytUrl)
    
    // CORS issue, we need to do it in backend
    // getSubtitles({
    //   videoID: id + '&origin=https://www.youtube.com'
    //   // lang: 'fr' // default: `en`
    // }).then(captions => {
    //   console.log(captions);
    // });

    props.setVideoHeight('640px');
    props.setVideoControls(true);
    props.setVideoFilePath(ytUrl);
    props.setAudioFilePath(null);

    if (props.objWavesurfer) {
      props.objWavesurfer.empty()
      props.waveDiv.current.innerHTML = ''
    }

    onClose();
  }

  return (
    <Dialog 
      fullWidth
      maxWidth="sm" 
      onClose={handleClose} 
      open={open}
    >
      <DialogTitle>{intl.get('load_source')}</DialogTitle>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<UploadFileIcon />}  label={intl.get("local_file")} {...a11yProps(0)} />
            <Tab icon={<YouTubeIcon />}  label={intl.get("youtube")} {...a11yProps(1)} />
            <Tab icon={<VideoCameraBackIcon />}  label={intl.get("streaming")} {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Button variant="contained" component="label" onChange={handleMp4Load}>
            {intl.get('load_mp4_file')}
            <input type="file" accept=".mp4" hidden />
          </Button>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <Button variant="contained" disabled>
            <LockIcon /> {intl.get("load_youtube_video")}
          </Button> */}
          <TextField
            value={ytUrl}
            error={!isYtUrlVaild}
            required
            helperText={ytErrorTxt}
            id="outlined-required"
            label="Required"
            onChange={handleYtChange}
          />
          <br />
          <Button 
            disabled={!isYtUrlVaild}
            variant="contained" 
            component="label" 
            onClick={handleYoutubeLoad}
          >
            {intl.get("load_youtube_video")}
          </Button>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Button variant="contained" disabled>
            <LockIcon /> {intl.get('load_hsl_streaming')}
          </Button>
        </TabPanel>
      </Box>
    </Dialog>
  );
}
