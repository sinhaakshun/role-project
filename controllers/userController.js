const User = require('../models/User');
const Feed = require('../models/Feed');


exports.createUser = async (req, res) => {
  try {
    const { name, role, email, password } = req.body;
    const requestingUserRole = req.user.role;

    if (requestingUserRole !== 'Super Admin') {
      return res.json({ error: 'Access forbidden' });
    }

    if (role === 'Super Admin') {
      return res.json({ error: 'Cannot create additional Super Admin' });
    }

    // Check for existing Super Admin
    const existingSuperAdmin = await User.findOne({where : {role : 'Super Admin'}});;
    if (role === 'Admin' && existingSuperAdmin) {
      return res.json({ error: 'Cannot create Admin without Super Admin' });
    }

    const newUser = await User.create({ name, role, email, password });

    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.json({ error: 'Internal server error' });
  }
};

  
exports.updateUserRole = async (req, res) => {
    try {
        const userId = req.params.id;
        const newRole = req.body.role;

        await User.update(
          { role: newRole },
          { where: { id: userId } } 
        );

        res.json({ message: 'User role updated' });
    } catch (err) {
        console.log('Error updating user role:', err);
        res.json({ error: 'Internal server error' });
    }
};


exports.getFeedsForUser = async (req, res) => {
  try {
    const userId = req.user.id; 
    
    const user = await User.findOne({where : {id : userId}});;
    if (!user) {
      return res.json({ error: 'User not found' });
    }

    if (user.role === 'Basic') {
      
      const feeds = await findOne({where : {id : userId}});
      res.json(feeds);
    } else {
      res.json({ error: 'Access forbidden' });
    }
  } catch (err) {
    console.log('Error getting feeds for user:', err);
    res.json({ error: 'Internal server error' });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const userIdToDelete = req.params.id;
    const requestingUserId = req.user.id; 
    
    const userToDelete = await User.findOne({where : {id : userIdToDelete}});
    if (!userToDelete) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (
      req.user.role === 'Super Admin' ||
      (req.user.role === 'Admin' && userToDelete.role !== 'Admin')
    ) {
      // Prevent deletion of super admin
      if (userToDelete.role === 'Super Admin') {
        return res.json({ error: 'Cannot delete Super Admin' });
      }

      // Check if user is attempting to delete themselves
      if (userToDelete.id === requestingUserId) {
        return res.json({ error: 'Cannot delete yourself' });
      }

      // Delete the user
      await User.destroy({ where: {id: userIdToDelete}});
      res.json({ message: 'User deleted' });
    } else {
      res.json({ error: 'Access forbidden' });
    }
  } catch (err) {
    console.log('Error deleting user:', err);
    res.json({ error: 'Internal server error' });
  }
};




