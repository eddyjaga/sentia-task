class PersonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :first_name, :last_name, :species, :gender, :weapon, :vehicle
  has_many :person_locations, lazy_load_data: true, links: {
    data: :locations
  }
  has_many :person_affiliations, lazy_load_data: true, links: {
    data: :affiliations
  }
end
