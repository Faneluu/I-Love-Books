package love.worldofbooks.books.users.services;

import jakarta.transaction.Transactional;
import love.worldofbooks.books.exception.UserNotFoundException;
import love.worldofbooks.books.users.models.User;
import love.worldofbooks.books.users.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User addUser(User user){
        System.out.println("User id to add: " + user.getId());
        return userRepo.save(user);
    }

    public List<User> findAllUsers() {
        return userRepo.findAll();
    }

    public User updateUser(User user){
        return userRepo.save(user);
    }

    public User findUserById(Long id){
        return userRepo.findUserById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    @Transactional
    public void deleteUser(Long id){
        System.out.println("Id: " + id);
        userRepo.deleteUserById(id);
    }
}
