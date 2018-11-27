USE project2;

INSERT INTO users 
	(userName, firstName, lastName, email, password, createdAt, updatedAt)
VALUES
  ("tester", "test", "account", "tester@gmail.com", 0, "2018-11-23 12:00", "2018-11-23 12:00");

INSERT INTO topics
	(topic, createdAt, updatedAt)
VALUES
  ("Testing", "2018-11-23 12:00", "2018-11-23 12:00");

INSERT INTO posts
  (body, createdAt, updatedAt, UserId, TopicId)
VALUES
  ("This is a test, this is only a test.", "2018-11-23 12:00", "2018-11-23 12:00",1,1);

INSERT INTO posts
  (body, createdAt, updatedAt, UserId, TopicId)
VALUES
  ("A second test post", "2018-11-23 12:00", "2018-11-23 12:00",1,1);
