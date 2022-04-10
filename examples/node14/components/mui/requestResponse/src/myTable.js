import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };

    this.preventDefault = this.preventDefault.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    let self = this;

    fetch('https://api.github.com/users/hemingwaylee/repos', {
      method: 'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      self.setState({
        rows: myJson
      });
    });
  }

  preventDefault(event) {
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <h1>My Repos</h1>
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
            <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Star</TableCell>
                <TableCell>Size</TableCell>
                {/* <TableCell align="right">Sale Amount</TableCell> */}
            </TableRow>
            </TableHead>
            <TableBody>
            {this.state.rows.map((row) => (
                <TableRow key={row.id}>
                <TableCell>{row.created_at}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.stargazers_count}</TableCell>
                <TableCell>{row.size}</TableCell>
                {/* <TableCell align="right">{`$${row.amount}`}</TableCell> */}
                </TableRow>
            ))}
            </TableBody>
          </Table>
          <Link color="primary" href="#" onClick={this.preventDefault} sx={{ mt: 3 }}>
            See more repos
          </Link>
        </TableContainer>
      </React.Fragment>
    );
  }
}

export default Orders;
