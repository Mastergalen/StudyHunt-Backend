
exports.up = function(knex, Promise) {
  return knex.schema.createTable('seats', (table) => {
    table.increments();
    table.integer('library_id').references('libraries.id');
    table.boolean('is_vacant').defaultTo('true');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('seats');
};
