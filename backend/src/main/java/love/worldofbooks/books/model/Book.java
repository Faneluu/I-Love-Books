package love.worldofbooks.books.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Book implements Serializable {
    @Id
    private Long id;
    private String name;
    private String author;
    private String imageUrl;
    private String description;
    private Long price;

    public Book() {}
    public Book(Long id, String name, String author, String imageUrl, String description, Long price){
        this.id = 0L;
        this.name = name;
        this.author = author;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getAuthor(){
        return author;
    }

    public void setAuthor(String author){
        this.author = author;
    }

    public String getImageUrl(){
        return imageUrl;
    }

    public void setImageUrl(String imageUrl){
        this.imageUrl = imageUrl;
    }

    public String getDescription(){
        return description;
    }

    public void seDescription(String description){
        this.description = description;
    }

    public Long getPrice(){
        return price;
    }

    public void setPrice(Long price){
        this.price = price;
    }

    @Override
    public String toString(){
        return "Book{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", author='" + author + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                '}';
    }

}
