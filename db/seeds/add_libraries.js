"use strict";

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sensors').del().then(() => {
    return knex('seats').del();
  }).then(() => {
    return knex('sensors_seats').del();
  }).then(() => {
    return knex('libraries').del();
  }).then(() => {
    // Inserts seed entries
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
  }).then(() => {
    return knex('libraries').insert([
      {name: 'Engineering Hub', created_at: knex.fn.now(), updated_at: knex.fn.now()}
    ], ['id']).then((res) => {
      let engineeringHubId = res[res.length - 1];
      let seats = [
        {
          library_id: engineeringHubId,
          is_vacant: Math.random() >= 0.5,
          pos_x: 0,
          pos_y: 0,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now()
        },
        {
          library_id: engineeringHubId,
          is_vacant: Math.random() >= 0.5,
          pos_x: 1,
          pos_y: 0,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now()
        },
        {
          library_id: engineeringHubId,
          is_vacant: Math.random() >= 0.5,
          pos_x: 0,
          pos_y: 1,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now()
        },
        {
          library_id: engineeringHubId,
          is_vacant: Math.random() >= 0.5,
          pos_x: 1,
          pos_y: 1,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now()
        },
      ];

      return knex('seats').insert(seats, ['id']).then((res) => {
        let seatId = res[res.length - 1];
        let seats = [];

        for (let i = 0; i < 4; i++) {
          seats.push({sensor_id: 1, seat_id: seatId - i});
        }

        return knex('sensors').insert([{
          id: 1,
          library_id: engineeringHubId,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        }]).then(() => {
          return knex('sensors_seats').insert(seats);
        });
      });
    });
  });
};
