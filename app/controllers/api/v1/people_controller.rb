class Api::V1::PeopleController < ApplicationController
  protect_from_forgery with: :null_session
  def options
    @options = {include: [:locations, :affiliations]}
  end

  def index
    people = Person.all
    render json: PersonSerializer.new(people, options).serialized_json
  end

  def show
    person = Person.find_by(id: params[:id])
    render json: PersonSerializer.new(person, options).serialized_json
  end

  def create

    person = Person.new(person_params)

    if params[:affiliations].blank?
      render json: { error: "No affiliation" }, status: 422
    elsif person.save

      create_or_delete_people_locations_affiations(person, params[:locations], params[:affiliations])
      
      render json: PersonSerializer.new(person, options).serialized_json
    else
      render json: { error: person.errors.messages }, status: 422
    end
    
  end

  private


  def create_or_delete_people_locations_affiations(person, locations, affiliations)
    person.person_locations.destroy_all
    person.person_affiliations.destroy_all
    locations = locations.strip.split(',')
    affiliations = affiliations.strip.split(',')

    locations.each do |location|
      person.locations << Location.find_or_create_by(name: location.strip)
    end

    affiliations.each do |affiliation|
      person.affiliations << Affiliation.find_or_create_by(name: affiliation.strip)
    end
  end

  def person_params
    params.require(:person).permit(:first_name, :last_name, :locations, :species, :gender, :affiliations, :weapon, :vehicle)
  end

end