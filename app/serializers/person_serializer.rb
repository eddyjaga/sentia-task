class PersonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :first_name, :last_name, :species, :gender, :weapon, :vehicle
  has_many :locations, through: :person_locations
  has_many :affiliations, through: :person_affiliations
  #has_many :person_affiliations
end
