/* STORAGE */
INSERT INTO storages (filename, url, createdAt, updatedAt) VALUES
('POaWsED6CLUJ0YAPoo3O1721354471614.png', 'http://localhost:3000/uploads/POaWsED6CLUJ0YAPoo3O1721354471614.png', DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('COClM5G0WaGD70S55w0V1721354550958.png', 'http://localhost:3000/uploads/COClM5G0WaGD70S55w0V1721354550958.png', DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('QgD1UVKveyOenIE4z8sA1721354559681.png', 'http://localhost:3000/uploads/QgD1UVKveyOenIE4z8sA1721354559681.png', DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('ilfbRCVX0zuYK2bh8rii1721354566445.png', 'http://localhost:3000/uploads/ilfbRCVX0zuYK2bh8rii1721354566445.png', DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Ms14xCdi8YwoLpExtI0i1721354572750.png', 'http://localhost:3000/uploads/Ms14xCdi8YwoLpExtI0i1721354572750.png', DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('w5Y3oKgc7jU5PDJp9B5A1721354590504.png', 'http://localhost:3000/uploads/w5Y3oKgc7jU5PDJp9B5A1721354590504.png', DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('HX1jRgdf949AEi5lgBhm1721354596291.png', 'http://localhost:3000/uploads/HX1jRgdf949AEi5lgBhm1721354596291.png', DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('xhHCftsgN44qEvrR7eFH1721354601228.png', 'http://localhost:3000/uploads/xhHCftsgN44qEvrR7eFH1721354601228.png', DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('OhtCFi0CsnK708lnGwh91721354605814.png', 'http://localhost:3000/uploads/OhtCFi0CsnK708lnGwh91721354605814.png', DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('5jnjdsGQ5pyRlPpRfToq1721354614605.png', 'http://localhost:3000/uploads/5jnjdsGQ5pyRlPpRfToq1721354614605.png', DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('axjohQCY54RR5HWetouX1721785800492.jpg', 'http://localhost:3000/uploads/axjohQCY54RR5HWetouX1721785800492.jpg', DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('2sb1Q3hwCKTuCWmB6sMS1721785813586.jpg', 'http://localhost:3000/uploads/2sb1Q3hwCKTuCWmB6sMS1721785813586.jpg', DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('efTo6WG7dpmLjW0ZKqP21721785821446.jpg', 'http://localhost:3000/uploads/efTo6WG7dpmLjW0ZKqP21721785821446.jpg', DATETIME('now', 'localtime'), DATETIME('now', 'localtime'));

/* ROLES */
INSERT INTO roles (name, description, createdAt, updatedAt) VALUES
('user', 'Regular user in the app', DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('admin', 'User with privileges of admin', DATETIME('now', 'localtime'), DATETIME('now', 'localtime'));

/* USERS */
INSERT INTO users (name, surname, username, email, password, avatar, createdAt, updatedAt) VALUES 
('Carlos', 'Lopez', 'carloslpz', 'carlos@mail.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', 1, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Maria', 'Gomez', 'mariag', 'maria@mail.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', 2, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Pedro', 'Sanchez', 'pedrito', 'pedro@mail.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', 3, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('John', 'Doe', 'johndoe', 'john.doe@example.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', 1, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Jane', 'Smith', 'janesmith', 'jane.smith@example.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', 2, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Michael', 'Johnson', 'michaelj', 'michael.johnson@example.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', 3, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Emily', 'Williams', 'emilyw', 'emily.williams@example.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', 4, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('David', 'Brown', 'davidb', 'david.brown@example.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', 5, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Sarah', 'Jones', 'sarahj', 'sarah.jones@example.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', 6, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Matthew', 'Garcia', 'matthewg', 'matthew.garcia@example.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', 7, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Jessica', 'Martinez', 'jessicam', 'jessica.martinez@example.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', 8, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Christopher', 'Rodriguez', 'christopherr', 'christopher.rodriguez@example.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', 9, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Amanda', 'Hernandez', 'amandah', 'amanda.hernandez@example.com', '$2a$10$gVbgV5/PLq07dOBfkSWJ1.YKWDi0uuof90ota.GSutxmnJhf53bny', 10, DATETIME('now', 'localtime'), DATETIME('now', 'localtime'));

/* POSTS */
INSERT INTO posts (content, media_id, status, user_id, createdAt, updatedAt) VALUES
('Mi first post in here', 11, 'active', 1, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Other posts from here', 12, 'active', 1, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Hi, im Maria.', 13, 'active', 2, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('This is the first post', NULL, 'active', 1, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Enjoying the sunny weather!', NULL, 'active', 2, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Just had a great lunch', NULL, 'active', 3, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Watching a movie tonight', NULL, 'active', 4, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Finished a great book', NULL, 'active', 5, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Going for a run', NULL, 'active', 6, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Baking cookies today', NULL, 'active', 7, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Learning SQL', NULL, 'active', 8, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Starting a new project', NULL, 'active', 9, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Traveling to a new city', NULL, 'active', 10, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Had an amazing coffee', NULL, 'active', 1, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Working on some code', NULL, 'active', 2, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Listening to music', NULL, 'active', 3, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Reading a fascinating article', NULL, 'active', 4, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Going to the gym', NULL, 'active', 5, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Watching the sunset', NULL, 'active', 6, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Painting a picture', NULL, 'active', 7, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Writing a blog post', NULL, 'active', 8, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Exploring new recipes', NULL, 'active', 9, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
('Planning a trip', NULL, 'active', 10, DATETIME('now', 'localtime'), DATETIME('now', 'localtime'));

/* FOLLOWS */
INSERT INTO follows (follower_user_id, followed_user_id, createdAt, updatedAt) VALUES 
(1, 2, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(2, 3, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(3, 4, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(4, 5, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(5, 6, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(6, 7, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(7, 8, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(8, 9, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(9, 10, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(10, 1, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(1, 3, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(2, 4, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(3, 5, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(4, 6, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(5, 7, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(6, 8, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(7, 9, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(8, 10, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(9, 1, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(10, 2, DATETIME('now', 'localtime'), DATETIME('now', 'localtime'));

/* LIKES */
INSERT INTO likes (user_id, post_id, createdAt, updatedAt) VALUES 
(1, 1, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(1, 2, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(1, 3, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(2, 1, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(2, 3, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(2, 4, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(3, 1, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(3, 2, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(3, 5, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(4, 1, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(4, 2, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(4, 6, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(5, 3, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(5, 4, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(5, 7, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(6, 4, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(6, 5, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(6, 8, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(7, 5, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(7, 6, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(7, 9, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(8, 6, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(8, 7, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(8, 10, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(9, 7, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(9, 8, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(9, 1, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(10, 8, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(10, 9, DATETIME('now', 'localtime'), DATETIME('now', 'localtime')),
(10, 2, DATETIME('now', 'localtime'), DATETIME('now', 'localtime'));