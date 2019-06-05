const Promise = require('bluebird');
const commentsData = require('./comments.json');
const Comment = require('./comment.model');
const User = require('../user/user.model');
const Restaurant = require('../restaurant/restaurant.model');

const registerComment = async (newComment) => {
  await Restaurant.registerComment(newComment);
  await User.registerComment(newComment);
  return newComment.save();
};

const commentSeeder = async () => {
  const restaurants = await Restaurant.list();
  const users = await User.list();
  const newComments = commentsData.map((cmt) => {
    const resResult = restaurants.filter(res => res.slug === cmt.restaurant);
    const usResult = users.filter(usr => usr.username === cmt.author);
    if (resResult && usResult) {
      const { _id: restaurantId } = resResult[0];
      const { _id: userId } = usResult[0];
      const {
        quality,
        packaging,
        deliveryTime,
        comment,
      } = cmt;
      const newComment = new Comment({
        author: userId,
        restaurant: restaurantId,
        quality,
        packaging,
        deliveryTime,
        comment,
      });
      return registerComment(newComment);
    }
    return null;
  });
  return Promise.all(newComments);
};

module.exports = commentSeeder;
