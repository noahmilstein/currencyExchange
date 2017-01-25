Rails.application.routes.draw do

  root 'pages#home'
  get '/', to: 'pages#home'

end
