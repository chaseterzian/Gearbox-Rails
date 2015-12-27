class ApplicationController < ActionController::Base
  after_action :allow_iframe, only: :embed
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  	def embed
  end

private

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end
end
