import React, { useState, useEffect } from "react";
import { StudentApi } from "../../client/backend-api/student";
import { BookApi } from "../../client/backend-api/book";
import { BackendApi } from "../../client/backend-api";

export const IssueBook = () => {
  const [students, setStudents] = useState([]); // List of students
  const [books, setBooks] = useState([]); // List of books
  const [selectedstudent, setSelectedstudent] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch student and book data on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      const { books } = await BackendApi.book.getAllBooks();
      setBooks(books);
    };

    const fetchStudents = async () => {
      const { students } = await BackendApi.student.getAllStudents();
      setStudents(students);
    };

    fetchBooks().catch(console.error);
    fetchStudents().catch(console.error);
  }, []);

  const handlestudentChange = (event) => {
    setSelectedstudent(event.target.value);
  };

  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedstudent || !selectedBook) {
      alert("Please select a roll number and book");
      return;
    }

    try {
      await issueBookToStudent(selectedstudent, selectedBook);
      // Handle success (optional)
      console.log("Book issued successfully!");
    } catch (error) {
      console.error("Error issuing book:", error);
      alert("An error occurred while issuing the book.");
    }

    // Log selected data to console on submit
    console.log("Selected Student Roll Number:", selectedstudent);
    console.log("Selected Book Title:", selectedBook);
  };

  return (
    <>
      <div>
        <h2>Issue Book</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="students.roll_number">Roll Number:</label>
          <select id="students.roll_number" value={selectedstudent} onChange={handlestudentChange}>
            <option value="">-- Select Roll Number --</option>
            {students.map((student) => (
              <option key={student.roll_number} value={student.roll_number}>
                {student.roll_number}
              </option>
            ))}
          </select>

          <label htmlFor="book">Book:</label>
          <select id="book" value={selectedBook} onChange={handleBookChange}>
            <option value="">-- Select Book --</option>
            {books.map((book) => (
              <option key={book.id} value={book.title}>
                {book.title}
              </option>
            ))}
          </select>

          <button type="submit">Issue Book</button>
        </form>
      </div>
    </>
  );
};

const issueBookToStudent = async (roll_number, title) => {
  try {
    const issueData = {
      roll_number,
      title,
      // Add a flag to indicate issued status (e.g., isIssued: true)
    };

    const response = await BackendApi.issue.issueBook(issueData);
    console.log(response); // Assuming the backend API returns a response object
  } catch (error) {
    console.error("Error issuing book:", error);
    // Handle errors appropriately (e.g., display an error message to the user)
  }
};