var moment = require('moment');

exports.seed = function(knex, Promise) {
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
      }).then(() => {
        let today = moment().subtract(1, 'days').format("YYYY-MM-DD");

        return knex('seats_log').insert([
          {seat_id: seatId, is_vacant: false, created_at: `${today} 15:00`},
          {seat_id: seatId, is_vacant: true, created_at: `${today} 15:30`},
          {seat_id: seatId, is_vacant: false, created_at: `${today} 15:36`},
          {seat_id: seatId, is_vacant: true, created_at: `${today} 16:36`},
          //
          {seat_id: seatId - 1, is_vacant: false, created_at: `${today} 14:32`},
          {seat_id: seatId - 1, is_vacant: true, created_at: `${today} 15:36`},
        ]);
      });
    });
  });
};
