exports.seed = function(knex, Promise) {
  return knex('points').del().then(function () {
    return knex('fav_maps').del().then(function () {
      return knex('maps').del().then(function () {
        return knex('users').del().then( function () {
          return Promise.all([
          knex('users').insert({id: 1000001, name: 'Alice', password:'12345'}),
          knex('users').insert({id: 1000002, name: 'Bob'}),
          knex('users').insert({id: 1000003, name: 'Charlie'})
          ]).then(function() {
            return Promise.all([
            knex('maps').insert({id: 2000001, users_id: 1000001, title: 'Burgers', longitude: -123.116226, latitude: 49.246292}),
            knex('maps').insert({id: 2000002, users_id: 1000001, title: 'Mexican', longitude: -123.116226, latitude: 49.246292})
            ]).then(function() {
              return Promise.all([

              knex('points').insert({id: 3000001, users_id: 1000001, maps_id: 2000001, title:'burgers', description: 'a', longitude:-123.1180, latitude:49.2895}),
              knex('points').insert({id: 3000002, users_id: 1000001, maps_id: 2000001, title:'burgers', description: 'b', longitude:-123.120562, latitude:49.275773}),
              knex('points').insert({id: 3000003, users_id: 1000001, maps_id: 2000001, title:'burgers', description: 'c', longitude:-123.116446, latitude:49.28337459}),
              knex('points').insert({id: 3000004, users_id: 1000001, maps_id: 2000002, title:'mexican', description: 'a', longitude:-123.121343, latitude:49.281521}),
              knex('points').insert({id: 3000005, users_id: 1000001, maps_id: 2000002, title:'mexican', description: 'b', longitude:-123.12894, latitude:49.278735}),
              knex('points').insert({id: 3000006, users_id: 1000001, maps_id: 2000002, title:'mexican', description: 'c', longitude:-123.112389, latitude:49.263047})
              ]).then(function() {
                return Promise.all([
                  knex('fav_maps').insert({maps_id:2000001, users_id:1000001})
                ]);
              });
            });
          });
        });
      });
    });
  });
};


