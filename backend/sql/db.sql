CREATE TABLE
    users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(32) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(200) NOT NULL,
        phone VARCHAR(10) NOT NULL,
        avatar_url VARCHAR(200),
        role TEXT NOT NULL CHECK (role IN ('Author', 'Reader')),
        created_at DATE DEFAULT CURRENT_DATE
    );

-- blogsTable
CREATE TABLE
    blogs (
        blog_id SERIAL PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        intro VARCHAR(200) NOT NULL,
        main_image_url VARCHAR(200) NOT NULL,
        para_one_title VARCHAR(50),
        para_one_desc VARCHAR(200),
        para_one_image_url VARCHAR(200),
        para_two_title VARCHAR(50),
        para_two_desc VARCHAR(200),
        para_two_image_url VARCHAR(200),
        category VARCHAR(20) NOT NULL,
        createdBy INT REFERENCES users (user_id) NOT NULL,
        author_name VARCHAR(32) NOT NULL,
        author_avatar VARCHAR(200),
        created_on DATE DEFAULT CURRENT_DATE
    );