class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add your routes here
  get "/authors" do
    author = Author.all
    author.to_json(include: :books)
  end

  get "/authors/:id" do
    author = Author.find(params[:id])
    author.to_json(include: :books)
  end

  post "/authors" do
    author = Author.create(
      name: params[:name],
      hometown: params[:hometown]
    )
    books_data = params[:books]
    books_data.each do |book_data|
      Book.create(
        title: book_data[:title],
        genre: book_data[:genre],
        author_id: author.id
      )
    end
    author.to_json(include: :books)
  end

  patch "/authors/:id" do
    author = Author.find(params[:id])
    author.update(
      name: params[:name],
      hometown: params[:hometown]
    )
    author.to_json(include: :books)
  end

  delete "/authors/:id" do
    author = Author.find(params[:id])
    author.destroy
    author.to_json(include: :books)
  end

  get "/books" do
    book = Book.all
    book.to_json
  end

  get "/books/:id" do
    book = Book.find(params[:id])
    book.to_json
  end

  post "/books" do
    book = Book.create(
      title: params[:title],
      genre: params[:genre]
    )
    book.to_json
  end

  delete "/books/:id" do
    book = Book.find(params[:id])
    book.destroy
    book.to_json
  end

end
