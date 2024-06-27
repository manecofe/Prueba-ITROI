"use client";

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import Post from "./Components/Post";

interface User {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  const [postList, setPostList] = useState([]);
  const [UserId, setUserId] = useState("");
  const [title, settitle] = useState("");
  const [body, setbody] = useState("");

  const updateContent = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPostList(data));
  };

  const handleCreate = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: UserId,
        body: body,
        userId: parseInt(UserId),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then(() => updateContent());
  };
  const handleUserIdChange = (value: any) => {
    setUserId(value);
  };
  const handleTitleChange = (value: any) => {
    settitle(value);
  };
  const handleBodyChange = (value: any) => {
    setbody(value);
  };

  useEffect(() => {
    updateContent();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="UserId"
            placeholder="UserId"
            value={UserId}
            onChange={(e) => handleUserIdChange(e.target.value)}
          />
          <TextField
            placeholder="Title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          <TextField
            placeholder="Body"
            value={body}
            onChange={(e) => handleBodyChange(e.target.value)}
          />
          <div
            className="p-7 cursor-pointer"
            onClick={() => {
              handleCreate();
            }}
          >
            <EmojiObjectsIcon />
          </div>
        </div>
      </Box>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {postList && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Body</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postList.map((row) => (
                  // eslint-disable-next-line react/jsx-key
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.userId}</TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.body}</TableCell>
                    <TableCell>
                      <DeleteIcon className="cursor-pointer" />
                    </TableCell>
                    <TableCell>
                      <CreateIcon className="cursor-pointer" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </main>
  );
}
