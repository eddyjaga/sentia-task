class PersonLocationSerializer
  include FastJsonapi::ObjectSerializer
  belongs_to :person
  belongs_to :location
end
