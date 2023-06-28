const jwt = require("jsonwebtoken");
const env = require("../.env");

module.exports = (req, res, next) => {
    // Verifica se o CORS precisa de autorização
    if (req.method === "OPTIONS") {
        next();
    } else {
        const token = req.body.token || req.query.token || req.headers["authorization"];

        if (!token) {
            return res.status(403).send({ errors: ["Não esta autorizado."] });
        }

        jwt.verify(token, env.authSecret, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    errors: ["Falhou na autenticação do token."],
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
};
