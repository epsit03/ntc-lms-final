const IssueApi = {
    getAllIssuedBook: async () => {
      const res = await fetch("/v1/issuedBook", { method: "GET" })
      return res.json()
    },
    // getstudentByroll_number: async (studentRoll_no) => {
    //   const res = await fetch(`/v1/student/${studentRoll_no}`, { method: "GET" })
    //   return res.json()
    // },
    issueBook: async (data) => {
      // console.log(data)
      const res = await fetch("/v1/issuedBook", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
      return res.json()
    },
    markIssuedBook: async (roll_number, data) => {
      const res = await fetch(`/v1/issuedBook/${roll_number}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
      return res.json()
    },
    deleteIssuedBook: async (roll_number) => {
      const res = await fetch(`/v1/issuedBook/${roll_number}`, { method: "DELETE" })
      return res.json()
    },
    
  }
  
  module.exports = { IssueApi }