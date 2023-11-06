puts "🌱 Seeding spices..."


5.times do
    author = Author.create(
        name: Faker::Book.author,
        hometown: Faker::Address.state
    )
3.times do
    book = Book.create(
        title: Faker::Book.title,
        genre: Faker::Book.genre,
        author_id: author.id   
    )
    end
end


puts "✅ Done seeding!"
