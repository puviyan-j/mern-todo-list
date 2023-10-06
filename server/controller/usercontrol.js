const userSchema = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (name.length === 0 ||
            email.length === 0) { return res.status(401).json({ error: "field connot be empty" }) }
        if (password.length < 8) {
            return res.status(401).json({ error: "password length must be 8" })
        }
        const user = await userSchema.findOne({ email: email })

        if (user) { return res.status(401).json("email already register") }


        const hash_password = await bcrypt.hash(password, 7)
        const data = new userSchema({
            name: name,
            email: email,
            password: hash_password,
        })

        const save = await data.save();

        res.status(200).json(save);
    }
    catch (err) { res.status(500).json({ error: "Internal Server Error" }) }


}
const login = async (req, res) => {

    try {
        const user = await userSchema.findOne({ email: req.body.email })

        if (!user) { return res.status(401).json({ error: "email not found please register" }) }

        const password = await bcrypt.compare(req.body.password, user.password)

        if (!password) { return res.status(401).json({ error: "password incorrect" }) }


        const gen_token = jwt.sign({ id: user._id }, process.env.s_key);

        const id = user._id;
        const email = user.email;
        const name = user.name

        res.status(200).json({ id, name, email, gen_token })
    }

    catch (err) {
        res.status(500).json({ error: "internal server error" })
    }

}

module.exports = { register, login }