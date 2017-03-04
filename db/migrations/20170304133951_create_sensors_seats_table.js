
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sensors_seats', (table) => {
    table.integer('sensor_id').references('sensors.id');
    table.integer('seat_id').references('seats.id');
    table.primary(['sensor_id', 'seat_id']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sensors_seats');
};
