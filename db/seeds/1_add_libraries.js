"use strict";

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sensors').del().then(() => {
    return knex('seats').del();
  }).then(() => {
    return knex('seats_log').del();
  }).then(() => {
    return knex('sensors_seats').del();
  }).then(() => {
    return knex('libraries').del();
  }).then(() => {
    // Seed libraries
    return knex('libraries').insert([
      {name: 'Main Library', created_at: knex.fn.now(), updated_at: knex.fn.now()},
      {name: 'Cruciform', created_at: knex.fn.now(), updated_at: knex.fn.now()},
      {name: 'Bartlett Library', created_at: knex.fn.now(), updated_at: knex.fn.now()},
      {name: 'Science Library', created_at: knex.fn.now(), updated_at: knex.fn.now()},
    ], ['id']);
  }).then(res => {
    let scienceLibraryId = res[res.length - 1];
    let seats = [];

    for(let i = 0; i < 100; i++) {
      seats.push({
        library_id: scienceLibraryId,
        is_vacant: Math.random() >= 0.5,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      });
    }

    return knex('seats').insert(seats, ['id']);
  });
};
