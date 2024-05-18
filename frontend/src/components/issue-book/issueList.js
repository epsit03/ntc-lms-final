import React, { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export const IssueList = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);

//   useEffect(() => {
//     const fetchIssuedBooks = async () => {
//       try {
//         const response = await fetch("/v1/issuedBook", { method: "GET" });
//         const issuedBooks = response;
//         setIssuedBooks(issuedBooks);
//       } catch (error) {
//         console.error("Error fetching issued books:", error);
//       }
//     };
//     fetchIssuedBooks();
//   }, []);

useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await fetch("/v1/issuedBook", { method: "GET" });
        const data = await response.json(); // Parse the response as JSON
        setIssuedBooks(data.issueBook); // Set issuedBooks to the array within the response
      } catch (error) {
        console.error("Error fetching issued books:", error);
      }
    };
  
    fetchIssuedBooks();
  }, []);
  

  console.log(issuedBooks)

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Issued Books List
      </Typography>
      {issuedBooks.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="right">Title</TableCell>
                {/* Add more table headers as needed based on your data structure */}
                {/* <TableCell align="right">Author</TableCell>  */}
                {/* <TableCell align="right">ISBN</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>z
              {issuedBooks.map((issuedBooks) => (
                <TableRow key={issuedBooks.id}> {/* Assuming 'id' is the unique identifier */}
                  <TableCell align="left">{}</TableCell>
                  {/* Add more table cells as needed to display other book information */}
                  {/* <TableCell align="right">{book.author}</TableCell> */}
                  {/* <TableCell align="right">{book.isbn}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6">No issued books found!</Typography>
      )}
    </Container>
  );
};

