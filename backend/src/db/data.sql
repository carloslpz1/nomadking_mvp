/* STORAGE */
INSERT INTO storages (filename, url, createdAt, updatedAt)
VALUES ('VxP3Xz1kerWq3vhJTUOL1720213031086.jpeg', 'http://localhost:3000/uploads/VxP3Xz1kerWq3vhJTUOL1720213031086.jpeg', DATETIME('now'), DATETIME('now'));

/* ROLES */
INSERT INTO roles (name, description, createdAt, updatedAt)
VALUES ('user', 'Regular user in the app', DATETIME('now'), DATETIME('now'));
INSERT INTO roles (name, description, createdAt, updatedAt)
VALUES ('admin', 'User with privileges of admin', DATETIME('now'), DATETIME('now'));

/* USERS */
INSERT INTO users (name, surname, username, email, 'password', createdAt, updatedAt) 
VALUES ('Carlos', 'Lopez', 'carloslpz', 'carlos@mail.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', DATETIME('now'), DATETIME('now'));
INSERT INTO users (name, surname, username, email, 'password', createdAt, updatedAt)
VALUES ('Maria', 'Gomez', 'mariag', 'maria@mail.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', DATETIME('now'), DATETIME('now'));
INSERT INTO users (name, surname, username, email, 'password', createdAt, updatedAt)
VALUES ('Pedro', 'Sanchez', 'pedrito', 'pedro@mail.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', DATETIME('now'), DATETIME('now'));

/* POSTS */
INSERT INTO posts (content, media_id, status, user_id, createdAt, updatedAt)
VALUES ('Mi first post in here', 1, 'active', 1, DATETIME('now'), DATETIME('now'));
INSERT INTO posts (content, media_id, status, user_id, createdAt, updatedAt)
VALUES ('Other posts from here', 1, 'active', 1, DATETIME('now'), DATETIME('now'));
INSERT INTO posts (content, media_id, status, user_id, createdAt, updatedAt)
VALUES ('Hi, im Maria.', 1, 'active', 2, DATETIME('now'), DATETIME('now'));

/* FOLLOWS */
INSERT INTO follows (follower_user_id, followed_user_id, createdAt, updatedAt)
VALUES (2, 1, DATETIME('now'), DATETIME('now'));
INSERT INTO follows (follower_user_id, followed_user_id, createdAt, updatedAt)
VALUES (3, 1, DATETIME('now'), DATETIME('now'));
INSERT INTO follows (follower_user_id, followed_user_id, createdAt, updatedAt)
VALUES (3, 2, DATETIME('now'), DATETIME('now'));
INSERT INTO follows (follower_user_id, followed_user_id, createdAt, updatedAt)
VALUES (1, 2, DATETIME('now'), DATETIME('now'));