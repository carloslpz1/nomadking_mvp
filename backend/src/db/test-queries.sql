SELECT * FROM posts WHERE user_id=1 ORDER BY createdAt DESC LIMIT 0, 10;

SELECT followed_user_id FROM follows WHERE follower_user_id=3 ORDER BY followed_user_id DESC;
SELECT * FROM posts WHERE user_id=(SELECT followed_user_id FROM follows WHERE follower_user_id=3) ORDER BY createdAt DESC LIMIT 0, 10;


SELECT *
FROM (SELECT p.id, p.content, p.user_id, p.createdAt,
(SELECT s.url FROM storages s WHERE s.id=p.media_id) AS media,
(SELECT COUNT(*) FROM likes l WHERE l.post_id=p.id) AS "likes",
EXISTS (SELECT 1 FROM likes l WHERE l.post_id=p.id AND l.user_id=1) AS liked,
(SELECT COUNT(*) FROM comments c WHERE c.post_id=p.id) AS "comments"
FROM posts p
WHERE p.user_id=1
UNION
SELECT p.id, p.content, p.user_id, p.createdAt,
(SELECT s.url FROM storages s WHERE s.id=p.media_id) AS media,
(SELECT COUNT(*) FROM likes l WHERE l.post_id=p.id) AS "likes",
EXISTS (SELECT 1 FROM likes l WHERE l.post_id=p.id AND l.user_id=1) AS liked,
(SELECT COUNT(*) FROM comments c WHERE c.post_id=p.id) AS "comments"
FROM posts p
JOIN follows f ON p.user_id=f.followed_user_id
WHERE f.follower_user_id=1 AND p.status="active"
) AS union_posts
ORDER BY union_posts.createdAt DESC
LIMIT 0, 10;

SELECT COUNT(*) AS totalPosts
FROM (SELECT p.id
FROM posts p
WHERE p.user_id=1 AND p.status="active"
UNION
SELECT p.id
FROM posts p
JOIN follows f ON p.user_id=f.followed_user_id
WHERE f.follower_user_id=1 AND p.status="active"
) AS union_posts

SELECT EXISTS(
	SELECT 1
	FROM follows
	WHERE follower_user_id = 2 AND followed_user_id = 3
) AS following;

SELECT u.id, u.name, u.surname, u.username, s.url AS avatar
FROM users u, storages s
JOIN posts p ON u.id=p.user_id
WHERE u.id=3 AND u.avatar=s.id
