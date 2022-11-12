import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function QuizPage(props) {
  const handleClickItem = (e, p) => {
    props.setCardIndex(p-1);
  }

  return (
    <Stack spacing={2}>
      <Pagination
        onChange={handleClickItem}
        count={props.count}
        shape="rounded"
        variant="outlined"
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}

