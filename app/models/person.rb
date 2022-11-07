class Person < ApplicationRecord
    enum gender: { male: 0, m: 0, Male:0, M:0, female: 1, f:1, F:1, Female:1, other: 2, Other:2 }

    validates :first_name, presence: { message: "must be first name please" }
    validates :species, presence: {message: "must be species please"}
    validates :gender, presence: {message: "must be gender please"}
    before_save :check_fields
    
    has_many :person_locations, dependent: :destroy
    has_many :locations, through: :person_locations
    has_many :person_affiliations, dependent: :destroy
    has_many :affiliations, through: :person_affiliations


    def check_fields
        self.first_name.downcase!
        self.last_name.downcase!
     end
end
