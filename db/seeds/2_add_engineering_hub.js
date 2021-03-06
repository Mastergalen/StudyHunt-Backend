"use strict";
var moment = require('moment');

exports.seed = function(knex, Promise) {
  return knex('libraries').insert([
      {name: 'Engineering Hub', created_at: knex.fn.now(), updated_at: knex.fn.now()}
    ], ['id']).then((res) => {
    let engineeringHubId = res[res.length - 1];
    let seats = [
      {
        library_id: engineeringHubId,
        is_vacant: true,
        pos_x: 0,
        pos_y: 0,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      },
      {
        library_id: engineeringHubId,
        is_vacant: true,
        pos_x: 1,
        pos_y: 0,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      },
      {
        library_id: engineeringHubId,
        is_vacant: true,
        pos_x: 0,
        pos_y: 1,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      },
      {
        library_id: engineeringHubId,
        is_vacant: false,
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
        let yesterday = moment().subtract(1, 'days').format("YYYY-MM-DD");
        let threeHoursAgo = moment().subtract(3, 'hours');

        return knex('seats_log').insert([
          {seat_id: seatId, is_vacant: false, created_at: `${yesterday} 15:00`},
          {seat_id: seatId, is_vacant: true, created_at: `${yesterday} 15:30`},
          {seat_id: seatId, is_vacant: false, created_at: `${yesterday} 15:36`},
          {seat_id: seatId, is_vacant: true, created_at: `${yesterday} 16:36`},
          {seat_id: seatId, is_vacant: false, created_at: `${yesterday} 19:01`},
          {seat_id: seatId, is_vacant: true, created_at: `${yesterday} 22:22`},
          {seat_id: seatId, is_vacant: false, created_at: `${yesterday} 23:48`},
          //
          {seat_id: seatId - 1, is_vacant: false, created_at: `${yesterday} 14:32`},
          {seat_id: seatId - 1, is_vacant: true, created_at: `${yesterday} 15:36`},
          {seat_id: seatId - 1, is_vacant: false, created_at: `${yesterday} 19:24`},
          {seat_id: seatId - 1, is_vacant: true, created_at: `${yesterday} 20:16`},

          {seat_id: seatId - 2, is_vacant: false, created_at: `${yesterday} 19:25`},
          {seat_id: seatId - 2, is_vacant: true, created_at: `${yesterday} 20:18`},
          {seat_id: seatId - 2, is_vacant: false, created_at: threeHoursAgo.format("YYYY-MM-DD HH:mm")},
          {seat_id: seatId - 2, is_vacant: true, created_at: threeHoursAgo.add(46, 'minutes').format("YYYY-MM-DD HH:mm")},

          {seat_id: seatId - 3, is_vacant: false, created_at: `${yesterday} 19:25`},
          {seat_id: seatId - 3, is_vacant: true, created_at: `${yesterday} 20:17`},
        ]);
      });
    });
  });
};
