class CreatePersonLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :person_locations do |t|
      t.belongs_to :person, null: false, foreign_key: true
      t.belongs_to :location, null: false, foreign_key: true

      t.timestamps
    end
  end
end
