
exports.up = function(knex, Promise) {
  return knex.schema.createTable('seats_log', (table) => {
    table.increments();
    table.integer('seat_id').references('seat_id');
    table.boolean('is_vacant').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('seats_log');
};
