'use strict';

/**
 * purpose service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::purpose.purpose');
