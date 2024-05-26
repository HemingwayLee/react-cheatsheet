import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function Welcome() {
  const length = 128;
  const foldername = "ghibli";
  const filename = "frame_";
  const itemData = [...new Array(length)].map((item, idx) => {
    return {
      color: (idx === 0 || idx === length-1) ? "#124116" : "#093170",
      img: `/${foldername}/${filename}${padZero(idx, 3)}.png`,
      title: `${filename}${padZero(idx, 3)}.png`
    }
  });

  function padZero(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

  return (
    <ImageList sx={{
      gridAutoFlow: "column",
      gridTemplateColumns: "repeat(auto-fit, minmax(336px,1fr)) !important",
      gridAutoColumns: "minmax(336px, 1fr)",
    }}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            sx={{backgroundColor: item.color}}
            title={item.title}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

// const itemData = [
//   {
//     img: '/cats/cat.jpg',
//     title: 'cat',
//   },
//   {
//     img: '/cats/cat.jpg',
//     title: 'cat',
//   },
//   {
//     img: '/cats/cat.jpg',
//     title: 'cat',
//   },
//   {
//     img: '/cats/cat.jpg',
//     title: 'cat',
//   },
//   {
//     img: '/cats/cat.jpg',
//     title: 'cat',
//   },
//   {
//     img: '/cats/cat.jpg',
//     title: 'cat',
//   }
// ];


