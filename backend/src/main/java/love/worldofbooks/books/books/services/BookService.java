package love.worldofbooks.books.books.services;

import jakarta.transaction.Transactional;
import love.worldofbooks.books.exception.UserNotFoundException;
import love.worldofbooks.books.books.models.Book;
import love.worldofbooks.books.books.repositories.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    private final BookRepo bookRepo;

    @Autowired
    public BookService(BookRepo bookRepo) {
        this.bookRepo = bookRepo;
    }

    public Book addBook(Book book){
        System.out.println("Book id to add: " + book.getId());
        return bookRepo.save(book);
    }

    public List<Book> findAllBooks() {
        return bookRepo.findAll();
    }

    public Book updateBook(Book book){
        return bookRepo.save(book);
    }

    public Book findBookById(Long id){
        return bookRepo.findBookById(id)
                .orElseThrow(() -> new UserNotFoundException("Book by id " + id + " was not found"));
    }

    @Transactional
    public void deleteBook(Long id){
        System.out.println("Id: " + id);
        bookRepo.deleteBookById(id);
    }
}
