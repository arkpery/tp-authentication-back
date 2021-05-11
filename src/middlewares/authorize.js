const authorize = (roles) => {
    return ((req, res, next) => {
        const user = req.user;

        if (roles.indexOf(user.role) === -1){
            res.status(401);
            res.json({
                message: 'Accès interdit : token invalide.'
            });
        }
        else {
            console.log("enter");
            next();
        }
    });
};

module.exports = authorize;
