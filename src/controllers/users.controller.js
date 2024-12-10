import { usersService } from "../services/index.js"

const getAllUsers = async (req, res) => {
    const users = await usersService.getAll();
    res.send({ status: "success", payload: users })
}

const getUser = async (req, res) => {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) return res.status(404).send({ status: "error", error: "User not found" })
    res.send({ status: "success", payload: user })
}

const updateUser = async (req, res) => {
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) return res.status(404).send({ status: "error", error: "User not found" })
    const result = await usersService.update(userId, updateBody);
    res.send({ status: "success", message: "User updated" })
}

const deleteUser = async (req, res) => {
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({ status: "success", message: "User deleted" })
}

const uploadDocuments = async (req, res) => {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    const files = req.files;
    if (!files.length) {
        return res.status(400).send({ status: "error", error: "No files attached" })
    }
    for (let file of files) {
        user.documents.push({
            name: file.originalname,
            reference: file.path
        })
    }
    const result = await usersService.update(userId, user, { new: true })
    res.send({ status: "success", payload: result })
}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    uploadDocuments,
}