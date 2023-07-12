const { Contacts, Users, Sequelize } = require("../models");
const Op = Sequelize.Op;
let self = {};

self.getAll = async (req, res) => {

    let searchTerm = req.body.q;
    let data;
    try {
        if (searchTerm) {
            data = await Contacts.findAll({
                order: [["id", "ASC"]], include: [{
                    model: Users,
                    attributes: ['id','firstName','lastName','email','createdAt','updatedAt']
                }],
                where: {
                    [Op.or]: [
                        {
                            id: {
                                [Op.like]: "%" + searchTerm + "%",
                            },
                        },
                        {
                            userID: {
                                [Op.like]: "%" + searchTerm + "%",
                            },
                        },
                        {
                            contact: {
                                [Op.like]: "%" + searchTerm + "%",
                            },
                        }
                    ],
                }
            });
        } else {
            data = await Contacts.findAll({
                order: [["id", "ASC"]], include: [{
                    model: Users,
                    attributes: ['id','firstName','lastName','email','createdAt','updatedAt']
                }],
            });
        }
        return res.status(200).json({
            'success': true,
            'count': data.length,
            'data': data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

self.createContacts = async (req, res) => {
    if (!req.body.userID || !req.body.contact) {
        return res.status(400).send({
            success: false,
            message: "Content can not be empty!"
        });
    }

    try {
        const newContact = {
            userID: req.body.userID,
            contact: req.body.contact
        };

        let data = await Contacts.create(newContact);
        return res.status(201).json({
            success: true,
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

self.get = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await Contacts.findByPk(id, {
            include: [{
                model: Users,
                attributes: ['id','firstName','lastName','email','createdAt','updatedAt']
            }],
        });
        if (data)
            return res.status(200).json({
                success: true,
                data: data
            })
        else
            return res.status(400).json({
                success: false,
                error: "No such Contacts present",
                data: []
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

self.updateContacts = async (req, res) => {
    try {
        let id = req.params.id;
        let body = req.body;
        let data = await Contacts.update(body, {
            where: {
                id: id
            }
        });
        if (data[0] === 0) {
            return res.status(200).json({
                success: false,
                error: "No Contacts found with this id"
            })
        }
        return res.status(200).json({
            success: true,
            "number of rows changed": data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

self.delete = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await Contacts.destroy({
            where: {
                id: id
            }
        });
        if (data === 1) {
            return res.status(200).json({
                success: true,
                message: `Contacts with id=${id} deleted`
            })
        }
        return res.status(200).json({
            success: false,
            message: `Contacts with id=${id} is not present.`
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            error: error
        })
    }
}

self.deleteAll = async (req, res) => {
    try {
        let data = await Contacts.destroy({
            where: {},
            truncate: true
        });
        return res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
};
module.exports = self;