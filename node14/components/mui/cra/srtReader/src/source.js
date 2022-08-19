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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    onClose();
  };

  function handleMp4Load({target}) {
    const selectedFile = target.files[0];
    props.setVideoFilePath(URL.createObjectURL(selectedFile));
    onClose();
  }

  function handleYtChange(event) {
    if (event.target.value == '1') {
      setYtErrorTxt('')
      setYtUrlVaild(true)
    } else {
      setYtErrorTxt('Invalid format: ###-###-####')
      setYtUrlVaild(false)
    }
  }

  function handleYoutubeLoad() {
    onClose();
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select a source</DialogTitle>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<UploadFileIcon />}  label="Local file" {...a11yProps(0)} />
            <Tab icon={<YouTubeIcon />}  label="Youtube" {...a11yProps(1)} />
            <Tab icon={<VideoCameraBackIcon />}  label="Streaming" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Button variant="contained" component="label" onChange={handleMp4Load}>
            Load .mp4 File
            <input type="file" accept=".mp4" hidden />
          </Button>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TextField
            error={!isYtUrlVaild}
            required
            helperText={ytErrorTxt}
            id="outlined-required"
            label="Required"
            onChange={handleYtChange}
          />
          <br />
          <Button variant="contained" component="label" onClick={handleYoutubeLoad}>
            Load YouTube video
          </Button>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Dialog>
  );
}
