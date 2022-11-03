class Location < ApplicationRecord
    has_many :person_locations, dependent: :destroy
    has_many :person, through: :person_locations
end
