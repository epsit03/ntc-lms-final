const { BookApi } = require("./book")
const { StudentApi } = require("./student")
const { UserApi } = require("./user")

const BackendApi = {
  book: BookApi,
  user: UserApi,
  student: StudentApi,
}

module.exports = { BackendApi }
