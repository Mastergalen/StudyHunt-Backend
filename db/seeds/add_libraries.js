
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('libraries').del()
    .then(function () {
      // Inserts seed entries
      return knex('libraries').insert([
        {name: 'Main Library', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {name: 'Cruciform', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {name: 'Bartlett Library', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {name: 'Science Library', created_at: knex.fn.now(), updated_at: knex.fn.now()},
      ], ['id']);
    }).then(res => {
      let scienceLibraryId = res[0];
      return knex('seats').del().then(() => {
        let seats = [];

        for(let i = 0; i < 80; i++) {
          seats.push({
            library_id: scienceLibraryId,
            is_vacant: false,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          });
        }

        for(let i = 0; i < 20; i++) {
          seats.push({
            library_id: scienceLibraryId,
            is_vacant: true,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          });
        }

        return knex('seats').insert(seats);
      });
    });
};
