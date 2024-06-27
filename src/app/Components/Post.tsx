import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import React from "react";

export default function Post(UserId, id, title, body) {
  return (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{UserId}</TableCell>
      <TableCell>{id}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{body}</TableCell>
      <TableCell>
        <DeleteIcon className="cursor-pointer" />
      </TableCell>
      <TableCell>
        <CreateIcon className="cursor-pointer" />
      </TableCell>
    </TableRow>
  );
}
