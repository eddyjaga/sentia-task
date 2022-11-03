class PeopleController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_person, only: %i[ show edit update destroy ]

  # GET /people or /people.json
  def index
    @people = Person.all
  end

  # GET /people/1 or /people/1.json
  def show
  end

  # GET /people/new
  def new
    @person = Person.new
  end

  # GET /people/1/edit
  def edit
  end

  # POST /people or /people.json
  def create
    @person = Person.new(person_params.except(:locations, :affiliations))
    create_or_delete_people_locations_affiations(@person, params[:person][:locations], params[:person][:affiliations])

    respond_to do |format|
      if @person.save
        format.html { redirect_to person_url(@person), notice: "Person was successfully created." }
        format.json { render :show, status: :created, location: @person }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @person.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /people/1 or /people/1.json
  def update
    create_or_delete_people_locations_affiations(@person, params[:person][:locations], params[:person][:affiliations])
    respond_to do |format|
      if @person.update(person_params.except(:locations, :affiliations))
        format.html { redirect_to person_url(@person), notice: "Person was successfully updated." }
        format.json { render :show, status: :ok, location: @person }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @person.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /people/1 or /people/1.json
  def destroy
    @person.destroy

    respond_to do |format|
      format.html { redirect_to people_url, notice: "Person was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.

    def create_or_delete_people_locations_affiations(person, locations, affiliations)
      person.person_locations.destroy_all
      person.person_affiliations.destroy_all
      locations = locations.strip.split(',')
      affiliations = affiliations.strip.split(',')
  
      locations.each do |location|
        person.locations << Location.find_or_create_by(name: location)
      end

      affiliations.each do |affiliation|
        person.affiliations << Affiliation.find_or_create_by(name: affiliation)
      end
    end

    def set_person
      @person = Person.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def person_params
      params.require(:person).permit(:first_name, :last_name, :species, :gender, :weapon, :vehicle, :locations, :affiliations)
    end
end
