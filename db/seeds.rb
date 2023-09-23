# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.destroy_all
Datastore.destroy_all

tester = User.create(
  email: "test@user",
  password: "password",
  password_confirmation: "password"
)

tester.datastores.create(
  store_id: "9585df718d544538ab8ffc97733913ea"
)