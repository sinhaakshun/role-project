const Feed = require('../models/Feed');


exports.createFeed = async (req, res) => {
  try {
    const feedData = {
      name: req.body.name,
      url: req.body.url,
      description: req.body.description,
    };

    const feedId = await Feed.create(feedData);
    
    // Return the created feed's ID
    res.json({ feedId });
  } catch (err) {
    console.log('Error creating feed:', err);
    res.json({ error: 'Internal server error' });
  }
};


exports.updateFeed = async (req, res) => {
  try {
    const feedId = req.params.id;
    const userId = req.user.id; // Get user ID from JWT token

    // Fetch feed to be updated
    const feedToUpdate = await Feed.findOne({where : {id : feedId}});
    if (!feedToUpdate) {
      return res.json({ error: 'Feed not found' });
    }

    // Check user roles for permission to update
    if (
      req.user.role === 'Super Admin' ||
      (req.user.role === 'Admin' && feedToUpdate.adminId === userId)
    ) {
      // Update the feed
      const updatedFeedData = {
        name: req.body.name || feedToUpdate.name,
        url: req.body.url || feedToUpdate.url,
        description: req.body.description || feedToUpdate.description,
        adminId: feedToUpdate.adminId, 
      };

      await Feed.update(updatedFeedData,
        { where: { id: feedId } });

      res.json({ message: 'Feed updated' });
    } else {
      res.json({ error: 'Access forbidden' });
    }
  } catch (err) {
    console.log('Error updating feed:', err);
    res.json({ error: 'Internal server error' });
  }
};


exports.deleteFeed = async (req, res) => {
  try {
    const feedId = req.params.id;
    const userId = req.user.id; // Extract user ID from JWT token

    const feed = await Feed.findOne({where : {id : feedId}});
    if (!feed) {
      return res.json({ error: 'Feed not found' });
    }

    if (req.user.role === 'Super Admin' || (req.user.role === 'Admin' && feed.adminId === userId)) {
      await Feed.destroy({ where: {id: feedId}});
      
      res.json({ message: 'Feed deleted' });
    } else {
      res.json({ error: 'Access forbidden' });
    }
  } catch (err) {
    console.log('Error deleting feed:', err);
    res.json({ error: 'Internal server error' });
  }
};
