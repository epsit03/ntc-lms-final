// import { useState, useEffect } from "react";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// import {StudentApi} from "../../client/backend-api/student";
// import { BackendApi } from "../../client/backend-api";


// dayjs.extend(utc);

// export const CalcStDues = async (students, bookReturnDeadline = 14) => {
//   const studentsWithDues = [];

//   for (const student of students) {
//     const { rollNo, bookBorrowedDate } = student;

//     // Check if student has borrowed a book
//     if (!bookBorrowedDate) {
//       studentsWithDues.push({ rollNo, dueAmount: 0 });
//       continue;
//     }

//     // Calculate days since book was borrowed
//     const daysSinceBorrowed = dayjs.utc().diff(dayjs.utc(bookBorrowedDate), "day");

//     // Check if overdue
//     if (daysSinceBorrowed > bookReturnDeadline) {
//       const overdueDays = daysSinceBorrowed - bookReturnDeadline;
//       const dueAmount = calculateOverdueAmount(overdueDays); // Replace with your overdue calculation logic
//       studentsWithDues.push({ rollNo, dueAmount });
//     } else {
//       studentsWithDues.push({ rollNo, dueAmount: 0 });
//     }
//   }

//   return (
//         <div>
//           <h2>Student Dues</h2>
//           {/* <table>
//             <thead>
//               <tr>
//                 <th>Roll Number</th>
//                 <th>Due Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student) => (
//                 <tr key={student.rollNo}>
//                   <td>{student.rollNo}</td>
//                   <td>{student.dueAmount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table> */}
//         </div>
//   );
// };

// // Placeholder function to calculate overdue amount. Replace with your logic
// const calculateOverdueAmount = (overdueDays) => {
//   // Replace with your logic to calculate due amount based on overdue days (e.g., per day rate)
//   return overdueDays * 5.0; // Replace 1.0 with your penalty per day
// };
import React, { useState, useEffect } from "react";
import { CalcStDues } from "./CalcStDues"; // Replace with path to calcStDues

export const StudentDues = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const studentsWithDues = await CalcStDues([
        // Replace this with your actual student data (array of objects)
        { rollNo: 123, bookBorrowedDate: "2024-04-20" },
        { rollNo: 456, bookBorrowedDate: null },
        { rollNo: 789, bookBorrowedDate: "2024-04-25" },
      ]);
      setStudents(studentsWithDues);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Student Dues</h2>
      <table>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Due Amount</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNo}>
              <td>{student.rollNo}</td>
              <td>{student.dueAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

