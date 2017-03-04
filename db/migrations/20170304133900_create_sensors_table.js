
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sensors', (table) => {
    table.increments();
    table.string('mac_address');
    table.integer('library_id').references('libraries.id');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sensors');
};
