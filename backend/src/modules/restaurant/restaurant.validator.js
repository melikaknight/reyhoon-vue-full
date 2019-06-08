/* eslint-disable newline-per-chained-call */
const Joi = require('@hapi/joi');

const newCommentValidator = {
  body: {
    author: Joi.string().required(),
    quality: Joi.number().min(0).max(5).required(),
    packaging: Joi.number().min(0).max(5).required(),
    deliveryTime: Joi.number().min(0).max(5).required(),
    comment: Joi.string(),
  },
  params: {
    slug: Joi.string().required(),
  },
};

const newRestaurantValidator = {
  body: {
    name: Joi.string().required(),
    slug: Joi.string().required(),
    address: Joi.string().required(),
    area: Joi.string().required(),
    logo: Joi.string(),
    coverImage: Joi.string(),
    openingTime: Joi.string().required(),
    closingTime: Joi.string().required(),
  },
};

module.exports = {
  newCommentValidator,
  newRestaurantValidator,
};
