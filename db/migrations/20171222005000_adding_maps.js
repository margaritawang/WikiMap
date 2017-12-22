exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', function (table) {
    table.uuid('id').primary();
    table.string('title');
    table.integer('users_id').unsigned();
    table.foreign('users_id').references('users.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps');
};
