
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sensors_log', (table) => {
    table.increments();
    table.integer('sensor_id').references('sensors.id');
    table.integer('temperature').nullable();
    table.float('luminosity').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sensors_log');
};
