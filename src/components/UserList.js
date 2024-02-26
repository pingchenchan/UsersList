import React, { useState } from 'react';
import { useTheme, useMediaQuery, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Collapse, IconButton, Alert } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// A component for each row in the table that can be expanded or collapsed
// When the screen is extra small, only the name is shown in the main table, 
// and the username and email are shown in the expanded section
function CollapsibleRow({ row, isXsDown }) {
  const [open, setOpen] = useState(false); // State to control the expand/collapse

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {isXsDown && (
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        <TableCell align="left">{row.name}</TableCell>
        {!isXsDown && <TableCell align="left">{row.username}</TableCell>}
        {!isXsDown && <TableCell align="left">{row.email}</TableCell>}
      </TableRow>
      {isXsDown && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="details">
                  <TableHead>
                    <TableRow>
                      <TableCell variant="caption">Username</TableCell>
                      <TableCell variant="caption">Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left" variant="caption">{row.username}</TableCell>
                      <TableCell align="left" variant="caption">{row.email}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

function UserList({ data }) {
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down('sm'));

  // Display message if no data is found
  if (!data || data.length === 0) {
    return <Box sx={{ mt: 2 }}><Alert severity="error">No users found.</Alert></Box>;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {isXsDown && <TableCell />} 
            <TableCell align="left">Name</TableCell>
            {!isXsDown && <TableCell align="left">Username</TableCell>}
            {!isXsDown && <TableCell align="left">Email</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <CollapsibleRow key={row.id} row={row} isXsDown={isXsDown} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserList;
