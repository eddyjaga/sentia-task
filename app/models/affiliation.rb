class Affiliation < ApplicationRecord
    has_many :person_affiliations, dependent: :destroy
    has_many :person, through: :person_affiliations
end
