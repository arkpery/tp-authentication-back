const postController = require('../controllers/postController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const authorize = require("../middlewares/authorize");
const Role = require("../constants").Role;

module.exports = (server) => {
    server.route('/api/posts')
        .all(jwtMiddleware.verifyToken)
        .get(authorize([Role.Admin, Role.User]), postController.listAllPosts)
        .post(authorize([Role.Admin]), postController.createAPost);

    server.route('/api/posts/:id_post') // req.params.id_post
        .all(jwtMiddleware.verifyToken)
        .get(authorize([Role.Admin, Role.User]), postController.getAPost)
        .put(authorize([Role.Admin]), postController.updateAPost)
        .delete(authorize([Role.Admin]), postController.deleteAPost);
}