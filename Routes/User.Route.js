const express = require('express');
const router = express.Router();
const User = require("../Modals/UserModal");

// Create a new user info
router.post('/', async (req, res) => {
  try {
    const userInfo = new User(req.body);
    await userInfo.save();
    res.status(201).send(userInfo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all user infos
// router.get('/', async (req, res) => {
//   try {
//     const userInfos = await User.find();
//     res.send(userInfos);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
router.get('/', async (req, res) => {
  try {
    const nameQuery = req.query.name;
    const mobileQuery = req.query.mobile;

    // Build MongoDB query based on search parameters
    const query = {};
    if (nameQuery) {
      query.name = { $regex: nameQuery, $options: 'i' }; // search case-insensitively
    }
    if (mobileQuery) {
      query.mobile = mobileQuery;
    }

    // Perform search using MongoDB query
    const result = await User.find(query);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// Get a single user info
router.get('/:id', async (req, res) => {
  try {
    const userInfo = await User.findById(req.params.id);
    if (!userInfo) {
      return res.status(404).send();
    }
    res.send(userInfo);
  } catch (error) {
    res.status(500).send(error);
  }
});



router.patch('/:id', async (req, res) => {
  const {name,mobile} =req.body
  const {id}=req.params;

  try {
    const userInfo = await User.findByIdAndUpdate(


      {_id:id},
      {name:name,
         mobile:mobile,
          },
             {new:true}

      );
    
    res.send(userInfo);
    
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user info
router.delete('/:id', async (req, res) => {
  try {
    const userInfo = await User.findByIdAndDelete(req.params.id);
    if (!userInfo) {
      return res.status(404).send();
    }
    res.send(userInfo);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;