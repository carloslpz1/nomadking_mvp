SELECT * FROM posts WHERE user_id=1 ORDER BY createdAt DESC LIMIT 0, 10;

SELECT followed_user_id FROM follows WHERE follower_user_id=3 ORDER BY followed_user_id DESC;
SELECT * FROM posts WHERE user_id=(SELECT followed_user_id FROM follows WHERE follower_user_id=3) ORDER BY createdAt DESC LIMIT 0, 10;

SELECT p.*
FROM posts p
JOIN follows f ON p.user_id=f.followed_user_id
WHERE f.follower_user_id=3
ORDER BY p.createdAt DESC
LIMIT 0, 10;

SELECT COUNT(p.id) AS totalPosts
FROM posts p
JOIN follows f ON p.user_id=f.followed_user_id
WHERE f.follower_user_id=3;

SELECT EXISTS(
	SELECT 1
	FROM follows
	WHERE follower_user_id = 2 AND followed_user_id = 3
) AS following;
