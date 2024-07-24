/* STORAGE */
INSERT INTO storages (filename, url, createdAt, updatedAt)
VALUES ('POaWsED6CLUJ0YAPoo3O1721354471614.png', 'http://localhost:3000/uploads/POaWsED6CLUJ0YAPoo3O1721354471614.png', DATETIME('now'), DATETIME('now'));
INSERT INTO storages (filename, url, createdAt, updatedAt)
VALUES ('COClM5G0WaGD70S55w0V1721354550958.png', 'http://localhost:3000/uploads/COClM5G0WaGD70S55w0V1721354550958.png', DATETIME('now'), DATETIME('now'));
INSERT INTO storages (filename, url, createdAt, updatedAt)
VALUES ('QgD1UVKveyOenIE4z8sA1721354559681.png', 'http://localhost:3000/uploads/QgD1UVKveyOenIE4z8sA1721354559681.png', DATETIME('now'), DATETIME('now'));
INSERT INTO storages (filename, url, createdAt, updatedAt)
VALUES ('ilfbRCVX0zuYK2bh8rii1721354566445.png', 'http://localhost:3000/uploads/ilfbRCVX0zuYK2bh8rii1721354566445.png', DATETIME('now'), DATETIME('now'));
INSERT INTO storages (filename, url, createdAt, updatedAt)
VALUES ('Ms14xCdi8YwoLpExtI0i1721354572750.png', 'http://localhost:3000/uploads/Ms14xCdi8YwoLpExtI0i1721354572750.png', DATETIME('now'), DATETIME('now'));
INSERT INTO storages (filename, url, createdAt, updatedAt)
VALUES ('w5Y3oKgc7jU5PDJp9B5A1721354590504.png', 'http://localhost:3000/uploads/w5Y3oKgc7jU5PDJp9B5A1721354590504.png', DATETIME('now'), DATETIME('now'));
INSERT INTO storages (filename, url, createdAt, updatedAt)
VALUES ('HX1jRgdf949AEi5lgBhm1721354596291.png', 'http://localhost:3000/uploads/HX1jRgdf949AEi5lgBhm1721354596291.png', DATETIME('now'), DATETIME('now'));
INSERT INTO storages (filename, url, createdAt, updatedAt)
VALUES ('xhHCftsgN44qEvrR7eFH1721354601228.png', 'http://localhost:3000/uploads/xhHCftsgN44qEvrR7eFH1721354601228.png', DATETIME('now'), DATETIME('now'));
INSERT INTO storages (filename, url, createdAt, updatedAt)
VALUES ('OhtCFi0CsnK708lnGwh91721354605814.png', 'http://localhost:3000/uploads/OhtCFi0CsnK708lnGwh91721354605814.png', DATETIME('now'), DATETIME('now'));
INSERT INTO storages (filename, url, createdAt, updatedAt)
VALUES ('5jnjdsGQ5pyRlPpRfToq1721354614605.png', 'http://localhost:3000/uploads/5jnjdsGQ5pyRlPpRfToq1721354614605.png', DATETIME('now'), DATETIME('now'));

INSERT INTO storages (filename, url, createdAt, updatedAt)
VALUES ('axjohQCY54RR5HWetouX1721785800492.jpg', 'http://localhost:3000/uploads/axjohQCY54RR5HWetouX1721785800492.jpg', DATETIME('now'), DATETIME('now'));
INSERT INTO storages (filename, url, createdAt, updatedAt)
VALUES ('2sb1Q3hwCKTuCWmB6sMS1721785813586.jpg', 'http://localhost:3000/uploads/2sb1Q3hwCKTuCWmB6sMS1721785813586.jpg', DATETIME('now'), DATETIME('now'));
INSERT INTO storages (filename, url, createdAt, updatedAt)
VALUES ('efTo6WG7dpmLjW0ZKqP21721785821446.jpg', 'http://localhost:3000/uploads/efTo6WG7dpmLjW0ZKqP21721785821446.jpg', DATETIME('now'), DATETIME('now'));

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

/* LIKES */
INSERT INTO likes (user_id, post_id, createdAt, updatedAt)
VALUES (2, 1, DATETIME('now'), DATETIME('now'))