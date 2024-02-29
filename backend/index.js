const express = require('express');
require('./db/config');
const User = require('./db/User');
const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.json());

app.post('/register', async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    resp.send(result);
})

app.post('/login', async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            resp.send(user);
        }
        else {
            resp.send({ result: "No User Found" });
        }
    }
    else
    {
        resp.send({ result: "No User Found" });
    }

})


app.listen(5000);