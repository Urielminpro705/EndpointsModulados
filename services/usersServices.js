const { users } = require("../data/data");

class usersServices {
    getAllUsers () {
        return {
            succeded: true,
            statusCode: 200,
            message: "OK",
            data: users
        }
    }

    getUserById (id) {
        const user = users.find(u => u.id === parseInt(id));
        return {
            succeded: true,
            statusCode: 200,
            message: "OK",
            data: user
        }
    }

    createUser (body) {
        const { name, username, password } = body;

        const missingFields = [];

        if (!name) missingFields.push("name");
        if (!username) missingFields.push("username");
        if (!password) missingFields.push("password");

        if (missingFields.length > 0) {
            return {
                succeded: false,
                statusCode: 400,
                message: `Missing required fields: ${missingFields.join(", ")}`,
                data: {}
            } 
        }

        const newUser = {
            id: users.length + 1,
            name,
            username,
            password
        }

        users.push(newUser);

        return {
            succeded: true,
            statusCode: 201,
            message: "User created",
            data: newUser
        }
    }

    updateUser (id, newData) {
        const { name, username, password } = newData;
        const user = users.find(u => u.id == id);

        if (user) {
            if (name) user.name = name;
            if (username) user.username = username;
            if (password) user.password = password;

            return {
                succeded: true,
                statusCode: 200,
                message: "Updated",
                data: user
            }
        } else {
            return {
                succeded: false,
                statusCode: 404,
                message: 'User Not Found',
                data: {}
            }
        }
    }

    deleteUser (id) {
        const userIndex = users.findIndex(u => u.id == id);

        if(userIndex !== -1) {
            users.splice(userIndex, 1);
            
            return {
                succeded: true,
                statusCode: 200,
                message: "Deleted",
                data: {id}
            }
        } else {
            return {
                succeded: false,
                statusCode: 404,
                message: 'User Not Found',
                data: {}
            }
        }
    }
}

module.exports = usersServices;