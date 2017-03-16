
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sensors_log').del()
    .then(function () {
      // Inserts seed entries
      return knex('sensors_log').insert([
        {id: 1, sensor_id: 1, temperature: 22.4, luminosity: 64, created_at: knex.fn.now()},
      ]);
    });
};
