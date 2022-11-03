# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_11_03_043323) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "affiliations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "locations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "people", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "species"
    t.integer "gender"
    t.string "weapon"
    t.string "vehicle"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "person_affiliations", force: :cascade do |t|
    t.bigint "person_id", null: false
    t.bigint "affiliation_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["affiliation_id"], name: "index_person_affiliations_on_affiliation_id"
    t.index ["person_id"], name: "index_person_affiliations_on_person_id"
  end

  create_table "person_locations", force: :cascade do |t|
    t.bigint "person_id", null: false
    t.bigint "location_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id"], name: "index_person_locations_on_location_id"
    t.index ["person_id"], name: "index_person_locations_on_person_id"
  end

  add_foreign_key "person_affiliations", "affiliations"
  add_foreign_key "person_affiliations", "people"
  add_foreign_key "person_locations", "locations"
  add_foreign_key "person_locations", "people"
end
