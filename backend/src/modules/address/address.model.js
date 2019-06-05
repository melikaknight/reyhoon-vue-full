const Promise = require('bluebird');
const mongoose = require('mongoose');
// const _ = require('lodash');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');
/**
 * Address Schema
 */
const AddressSchema = new mongoose.Schema({
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Area',
  },
  address: {
    type: String,
  },
}, { timestamps: true });

/**
 * Methods
 */
AddressSchema.method({});

/**
 * Statics
 */
AddressSchema.statics = {

  get(id) {
    return this.findById(id)
      .exec()
      .then((address) => {
        if (address) {
          return address;
        }
        const err = new APIError(
          'No such address exists!',
          httpStatus.NOT_FOUND,
          true
        );
        return Promise.reject(err);
      });
  },
};

module.exports = mongoose.model('Address', AddressSchema);
