class Person < ApplicationRecord
    has_many :person_locations, dependent: :destroy
    has_many :locations, through: :person_locations
    has_many :person_affiliations, dependent: :destroy
    has_many :affiliations, through: :person_affiliations
end
