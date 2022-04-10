import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

// function preventDefault(event) {
//   event.preventDefault();
// }

export default function Card() {
  const [repos, setRepos] = React.useState(0);
  const [fetchDate, setFetchDate] = React.useState(0);

  const getRepoCounts = () => {
    fetch('https://api.github.com/users/hemingwaylee/repos', {
      method: 'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      setRepos(myJson.length);
      setFetchDate(new Date().getTime());
    });
  };

  return (
    <React.Fragment>
      <h1>Number of my repos</h1>
      <Typography component="p" variant="h4">
        {repos}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {Intl.DateTimeFormat().format(fetchDate)}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={getRepoCounts}>
          Get repo count
        </Link>
      </div>
    </React.Fragment>
  );
}

