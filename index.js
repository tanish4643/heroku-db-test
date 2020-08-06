const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://uujvltenecqnft:d67db419f72f07ec955fb2e8ad1af06a06c559efc9a1e09ebe7b7f87641b480e@ec2-54-159-138-67.compute-1.amazonaws.com:5432/daf1kvus5lrv0j');

const User = require('model/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* DATABASE SECTION ENDS */
sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

User.sync({ force: true });
/* DATABASE SECTION ENDS */

/* ROUTE SECTION STARTS */
app.get('/', (req, res) => res.json({ message: 'Hello World' }));

app.post('/user', async (req, res) => {
    try {
        const newUser = new User(req.body)
        await newUser.save()
        res.json({ user: newUser })
    } catch(error) {
        console.error(error)
    }
});

app.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await User.findAll({
            where: {id: userId}
        });
        res.json({ user })
    }
    catch(error) {
        console.error(error)
    }    
});
/* ROUTE SECTION ENDS */

app.listen(3000, () => console.log(`app listening on port 3000!`))