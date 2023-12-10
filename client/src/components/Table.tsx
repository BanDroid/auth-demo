import { default as MUITable } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IUser } from "../models/user";

export default function Table({ data }: { data: IUser | null }) {
  return (
    <TableContainer component={Paper}>
      <MUITable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Property</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            Object.entries(data).map((obj) => (
              <TableRow
                key={obj[0]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {obj[0]}
                </TableCell>
                <TableCell align="right">{obj[1]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
}
