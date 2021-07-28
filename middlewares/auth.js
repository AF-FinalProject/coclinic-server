
const authentication = (req, res, next) => {
};

const authorization = (req, res, next) => {
};

module.exports = { authentication, authorization };



// const authentication = (req, res, next) => {
//   try {
//     let decode = verifyToken(req.headers.access_token)
//     User.findByPk(+decode.id)
//       .then(user => {
//         if (user) {
//           req.logginUser = { id: user.id, email: user.email }
//           next()
//         } else {
//           next(err)
//         }
//       }).catch(err => {
//         next(err)
//       })
//   } catch (err) {
//     next(err)
//   }
// }


// const authOwnerTodo = (req, res, next) => {
//   let idTodo = +req.params.id
//   Todo.findByPk(idTodo)
//     .then(todo => {
//       if (todo) {
//         let isAuthorized = todo.UserId === +req.logginUser.id
//         isAuthorized ? next() : next({ msg: 'UnAuthorized - Access is denied' })
//       } else {
//         next({ msg: 'Todo not found' })
//       }
//     })
//     .catch(err => next(err))
// }
