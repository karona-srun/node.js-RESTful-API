const { Users, Sequelize } = require("../models");
const Op = Sequelize.Op;
let self = {};

self.getAll = async (req, res) => {
    try {
        let data = await Users.findAll({});
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

self.createUsers = async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email) {
        return res.status(400).send({
            success: false,
            message: "Content can not be empty!"
        });
    }
    try {
        const newUsers = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        };
        let data = await Users.create(newUsers);
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
        let data = await Users.findByPk(id);
        if (data)
            return res.status(200).json({
                success: true,
                data: data
            })
        else
            return res.status(400).json({
                success: false,
                error: "No such Users present",
                data: []
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

self.updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        let body = req.body;
        let data = await Users.update(body, {
            where: {
                id: id
            }
        });
        if (data[0] === 0) {
            return res.status(200).json({
                success: false,
                error: "No Users found with this id"
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

self.searchUser = async (req, res) => {
    try {
        let q = req.body.q;
        var options = {
            where: {
                $or: [
                    {
                        'Users.id': {
                            like: '%' + q + '%'
                        },
                    },
                    {
                        'Users.firstName': {
                            like: '%' + q + '%'
                        },
                    },
                    {
                        'Users.lastName': {
                            like: '%' + q + '%'
                        },
                    }, {
                        'Users.email': {
                            like: '%' + q + '%'
                        },
                    }
                ]
            },
            include: [
                { model: Users },
            ]
        };

        let data = await Users.findAll(options);
        if (data[0] === 0) {
            return res.status(200).json({
                success: false,
                error: "No Users found with this id"
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
        let data = await Users.destroy({
            where: {
                id: id
            }
        });
        if (data === 1) {
            return res.status(200).json({
                success: true,
                message: `Users with id=${id} deleted`
            })
        }
        return res.status(200).json({
            success: false,
            message: `Users with id=${id} is not present.`
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
        let data = await Users.destroy({
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