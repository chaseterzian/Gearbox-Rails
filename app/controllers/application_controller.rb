class ApplicationController < ActionController::Base
	config.action_dispatch.default_headers['X-Frame-Options'] = "ALLOW-FROM https://gearbox-11beta.herokuapp.com"
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

end
