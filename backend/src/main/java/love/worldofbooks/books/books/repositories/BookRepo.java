package love.worldofbooks.books.books.repositories;

import love.worldofbooks.books.books.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BookRepo extends JpaRepository<Book, Long> {
    void deleteBookById(Long id);

    Optional<Book> findBookById(Long id);
}
