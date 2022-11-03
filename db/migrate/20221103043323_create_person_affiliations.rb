class CreatePersonAffiliations < ActiveRecord::Migration[7.0]
  def change
    create_table :person_affiliations do |t|
      t.belongs_to :person, null: false, foreign_key: true
      t.belongs_to :affiliation, null: false, foreign_key: true

      t.timestamps
    end
  end
end
