const router = require('express').Router();
const User = require('../model/User');
const { registrationValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {

    //Validating data before creating user
    const { error } = registrationValidation(req.body);
    if (error) {
        return res.status(400).send( error.details[0].message );
    };

    //Check if user exists
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) return res.status(400).send({ id: userExist._id, message: 'User Exists' });


    //Creating new user
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.status(200).send({ id: savedUser._id, message: "New user has been registered." });
    } catch (err) {
        res.status(400).send(err);
    }

});


// Logging User in
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ message: "Can't find this user" });
        }
  
        const correctPw = await user.isCorrectPassword(req.body.password);
  
        if (!correctPw) {
            return res.status(400).send({ message: "Wrong password!" });
        }
    
        return res.status(200).send({ id: user._id, message: "Logged In!" });

})


module.exports = router;