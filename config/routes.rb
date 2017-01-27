Rails.application.routes.draw do

  root 'pages#home'
  get '/', to: 'pages#home'

  namespace :api do
    resources :sources, only: [:index]
  end

end
