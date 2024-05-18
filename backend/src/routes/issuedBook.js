const router = require("express")()
const { IssueModel } = require("../models/issuedBook")

router.get("/", async (req, res, next) => {
  try {
    const issueBook= await IssueModel.find({})
    return res.status(200).json({
      issueBook: issueBook.map((issueBook) => ({
        ...issueBook.toJSON(),
      })),
    })
  } catch (err) {
    next(err)
  }
})

router.get("/:accNo", async (req, res, next) => {
  try {
    const iB = await IssueModel.findOne({ roll_number: req.params.studentRoll_no })
    if (accNo == null) {
      return res.status(404).json({ error: "accNo not found" })
    }
    return res.status(200).json({
      issueBook: {
        ...iB.toJSON(),
        // availableQuantity: student.quantity - student.borrowedBy.length,
      },
    })
  } catch (err) {
    next(err)
  }
})

router.post("/:roll_number", async (req, res, next) => {
  try {
    const iB = await IssueModel.findOne({ accNo: req.body.accNo })
    if (iB != null) {
      return res.status(400).json({ error: "book with same accNo already found" })
    }
    const newIssuedBook = await IssueModel.create(req.body)
    return res.status(200).json({ issuedBook: newIssuedBook })
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    // const iB = await IssueModel.findOne({ title: req.body.title })
    // if (iB != null) {
    //   return res.status(400).json({ error: "book with same accNo already found" })
    // }
    const newIssuedBook = await IssueModel.create(req.body)
    return res.status(200).json({ issueBook: newIssuedBook })
  } catch (err) {
    next(err)
  }
})

// router.patch("/:studentRoll_no", async (req, res, next) => {
//   try {
//     const iB = await IssueModel.findOne({ roll_number: req.params.studentRoll_no })
//     if (iB == null) {
//       return res.status(404).json({ error: "student not found" })
//     }
//     const { _id, roll_number, ...rest } = req.body
//     const updatedstudent = await student.update(rest)
//     return res.status(200).json({ student: updatedstudent })
//   } catch (err) {
//     next(err)
//   }
// })

router.delete("/:accNo", async (req, res, next) => {
  try {
    const iB = await IssueModel.findOne({ accNo: req.params.accNo })
    if (iB == null) {
      return res.status(404).json({ error: "Issued book not found" })
    }
    await iB.delete()
    return res.status(200).json({ success: true })
  } catch (err) {
    next(err)
  }
})

module.exports = { router }