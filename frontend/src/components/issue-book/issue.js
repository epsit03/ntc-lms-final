import React, { useState, useEffect } from "react";
import {StudentApi} from '../../client/backend-api/student'
import {BookApi} from '../../client/backend-api/book'

export const IssueBook = () => {
  const [students, setStudents] = useState([]); // List of students
  const [books, setBooks] = useState([]); // List of books
  const [selectedstudent, setSelectedstudent] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch student and book data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const studentData = await fetchStudentsFromBackend(); // Replace with your student data fetching logic
      const bookData = await fetchBooksFromBackend(); // Replace with your book data fetching logic
      setStudents(studentData);
      setBooks(bookData);
    };

    fetchData();
  }, []);

  const handlestudentChange = (event) => {
    setSelectedstudent.roll_number(event.target.value);
  };

  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedstudent.roll_number || !selectedBook) {
      alert("Please select a roll number and book");
      return;
    }

    const issueResult = await issueBookToStudent(selectedstudent.roll_number, selectedBook); // Replace with your book issue logic
    if (issueResult.success) {
      alert("Book issued successfully!");
      // Clear selections after successful issue
      setSelectedstudent.roll_number(null);
      setSelectedBook(null);
    } else {
      alert("Error issuing book: " + issueResult.message);
    }
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
            <option key={student.student.roll_number} value={student.student.roll_number}>
              {student.student.roll_number}
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


// Helper functions (replace with your actual backend interaction logic)
const fetchStudentsFromBackend = async () => {
  try {
    const response = await StudentApi.getAllStudents();
    if (response.success) {
      return response.data; // Assuming data is the key holding student information
    } else {
      console.error("Error fetching students:", response.message);
      return []; // Return empty array on error
    }
  } catch (error) {
    console.error("Error fetching students:", error);
    return []; // Return empty array on error
  }
  // Implement your logic to fetch student data from backend
};

const fetchBooksFromBackend = async () => {
  try {
    const response = await BookApi.getAllBooks();
    if (response.success) {
      return response.data; // Assuming data is the key holding book information
    } else {
      console.error("Error fetching books:", response.message);
      return []; // Return empty array on error
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    return []; // Return empty array on error
  }
  // Implement your logic to fetch book data from backend
};

const issueBookToStudent = async () => {
  try {
    // 1. Find the book by title (assuming a title based search endpoint)
    const bookResponse = await BookApi.getBookByIsbn(book.title); // Replace with your endpoint if title is not the search criteria
    if (!bookResponse.success) {
      return { success: false, message: `Error finding book: ${bookResponse.message}` };
    }
    const book = BookApi.data;

    // 2. Check book availability (assuming an "available" property in book data)
    if (!book.available) {
      return { success: false, message: `Book '${book.title}' is not currently available for issuing.` };
    }

    // 3. Update book data to mark it issued (assuming a patch endpoint for updating book)
    const updateBookResponse = await BookApi.patchBookByIsbn(book.isbn, { available: false });
    if (!updateBookResponse.success) {
      return { success: false, message: `Error updating book availability: ${updateBookResponse.message}` };
    }

    // 4. Update student data to link the issued book (assuming a patch endpoint for updating student)
    const updateStudentResponse = await StudentApi.patchstudentByroll_number({ borrowedBook: book.isbn }); // Replace with your logic to link book
    if (!updateStudentResponse.success) {
      // Revert book availability change on student update failure (optional)
      await BookApi.patchBookByIsbn(book.isbn, { available: true }); // Consider error handling for revert
      return { success: false, message: `Error updating student record: ${updateStudentResponse.message}` };
    }

    return { success: true };
  } catch (error) {
    console.error("Error issuing book:", error);
    return { success: false, message: "Error issuing book. Please try again." };
  }
  // Implement your logic to issue book to student using student.roll_number and book.title
  // This function should return an object with success (bool) and message (optional string)
};
