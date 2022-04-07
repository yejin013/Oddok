package com.oddok.server.domain.bookmark.dao;

import com.oddok.server.domain.bookmark.entity.Bookmark;
import com.oddok.server.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Optional<Bookmark> findByUser(User user);
}
