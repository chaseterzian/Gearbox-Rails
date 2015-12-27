class TestingController < ApplicationController
	after_action :allow_iframe, only: :embed

	def index
	end

	def show
	end

	def embed
  end

private

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end
	

end
