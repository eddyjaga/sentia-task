class PersonAffiliation < ApplicationRecord
  belongs_to :person
  belongs_to :affiliation
end
