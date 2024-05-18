const { BookApi } = require("./book")
const { StudentApi } = require("./student")
const {IssueApi} = require("./issueBook")
const { UserApi } = require("./user")

const BackendApi = {
  book: BookApi,
  user: UserApi,
  student: StudentApi,
  issue: IssueApi,

}

module.exports = { BackendApi }
