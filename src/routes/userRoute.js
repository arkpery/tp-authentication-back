const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

module.exports = (server) => {
    server.post('/api/user/register', userController.userRegister);
    server.post('/api/admin/register', userController.adminRegister);
    server.post('/api/user/login', userController.userLogin);
    server.route('/api/user/right').all(jwtMiddleware.verifyToken).get(userController.userRight);
}