json.extract! person, :id, :first_name, :last_name, :locations, :species, :affiliations, :gender, :weapon, :vehicle, :created_at, :updated_at
json.url person_url(person, format: :json)
