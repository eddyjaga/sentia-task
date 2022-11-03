Rails.application.routes.draw do
  resources :people
  resources :locations
  resources :affiliations
  
  
  namespace :api do
    namespace :v1 do
      resources :people
    end
  end


end
