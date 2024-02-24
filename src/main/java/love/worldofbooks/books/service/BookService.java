package love.worldofbooks.books.service;

import love.worldofbooks.books.exception.UserNotFoundException;
import love.worldofbooks.books.model.Book;
import love.worldofbooks.books.repo.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class BookService {
    private final BookRepo bookRepo;

    @Autowired
    public BookService(BookRepo bookRepo) {
        this.bookRepo = bookRepo;
    }

    public Book addBook(Book book){
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
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }
    public void deleteBook(Long id){
        bookRepo.deleteBookById(id);
    }
}
