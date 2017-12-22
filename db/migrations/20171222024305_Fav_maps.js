exports.up = function(knex, Promise) {
  return knex.schema.createTable('fav_maps', function (table) {
    table.integer('users_id').unsigned();
    table.foreign('users_id').references('users.id');
    table.integer('maps_id').unsigned();
    table.foreign('maps_id').references('maps.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fav_maps');
};
