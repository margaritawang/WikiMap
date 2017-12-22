exports.up = function(knex, Promise) {
  return knex.schema.createTable('points', function (table) {
    table.increments('id');
    table.string('title');
    table.string('description');
    table.integer('longitude');
    table.integer('latitude');
    table.integer('users_id').unsigned();
    table.foreign('users_id').references('users.id');
    table.integer('maps_id').unsigned();
    table.foreign('maps_id').references('maps.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('points');
};

