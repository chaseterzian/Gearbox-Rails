Rails.application.routes.draw do

  root 'landing#index'
  resources :testing

end
