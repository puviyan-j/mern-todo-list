
const todoSchema = require("../models/todo");



const addTodo = async (req, res) => {

    try {
        const data = new todoSchema({
            userId: req.user.id,
            list: req.body.list,
            view: req.body.view
        })

        const save = await data.save();

        res.status(200).json(save)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }



}

const gettodo = async (req, res) => {

    try {
        const view = await todoSchema.find({ userId: req.user.id })
        res.status(200).json(view)
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" })
    }

}

const remove = async (req, res) => {
    try {
        const del = await todoSchema.findByIdAndDelete(req.params.id);

        res.json("deleted");

    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" })
    }

}

const update = async (req, res) => {
    try {
        const update = await todoSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.json(update)
    }
    catch (err) { res.status(500).json({ error: "Internal Server Error" }) }

}

module.exports = { addTodo, gettodo, remove, update, }