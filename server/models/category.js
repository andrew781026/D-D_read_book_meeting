'use strict';

const { Model } = require('objection');

class Category extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'categorys';
  }
}

module.exports = {
  Category,
};