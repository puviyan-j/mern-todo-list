const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {

try{
    const token = await req.header("Authorization");
    console.log(token)

    if (!token) { return res.status(403).json({ error: "access Denied" }) }
    
        const verify = jwt.verify(token, process.env.s_key)
        req.user = verify
        next()

    }
    catch (err) {
        res.status(500).json({ error: err.message })

    }

}

module.exports = { auth }