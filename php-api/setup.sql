-- php-api/setup.sql
-- SQL Schema untuk webdev_academy database

-- Drop database jika sudah ada (hati-hati!)
-- DROP DATABASE IF EXISTS webdev_academy;

-- Create database
CREATE DATABASE IF NOT EXISTS webdev_academy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE webdev_academy;

-- ============================================
-- TABLE: users
-- Tabel untuk menyimpan data user
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url VARCHAR(255),
    bio TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);

-- ============================================
-- TABLE: courses
-- Tabel untuk menyimpan data kursus
-- ============================================
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    instructor VARCHAR(255),
    category VARCHAR(100),
    level ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Beginner',
    duration_hours INT,
    price DECIMAL(10, 2) DEFAULT 0,
    thumbnail_url VARCHAR(255),
    is_published BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3, 2),
    total_students INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_title (title),
    INDEX idx_category (category),
    INDEX idx_level (level)
);

-- ============================================
-- TABLE: lessons
-- Tabel untuk menyimpan data lesson
-- ============================================
CREATE TABLE IF NOT EXISTS lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    module VARCHAR(255),
    description TEXT,
    content LONGTEXT,
    video_url VARCHAR(255),
    duration_minutes INT,
    order_number INT,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_course_id (course_id),
    INDEX idx_order (order_number)
);

-- ============================================
-- TABLE: enrollments
-- Tabel untuk menyimpan data enrollment user ke kursus
-- ============================================
CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    progress_percentage INT DEFAULT 0,
    status ENUM('Active', 'Completed', 'Inactive') DEFAULT 'Active',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (user_id, course_id),
    INDEX idx_user_id (user_id),
    INDEX idx_course_id (course_id),
    INDEX idx_status (status)
);

-- ============================================
-- TABLE: lesson_progress
-- Tabel untuk menyimpan progress lesson user
-- ============================================
CREATE TABLE IF NOT EXISTS lesson_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at DATETIME,
    watch_time_seconds INT DEFAULT 0,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    UNIQUE KEY unique_lesson_progress (user_id, lesson_id),
    INDEX idx_user_id (user_id),
    INDEX idx_is_completed (is_completed)
);

-- ============================================
-- TABLE: activity_logs
-- Tabel untuk menyimpan log aktivitas user
-- ============================================
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_timestamp (timestamp)
);

-- ============================================
-- TABLE: verification_codes
-- Tabel untuk menyimpan kode verifikasi email
-- ============================================
CREATE TABLE IF NOT EXISTS verification_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    code VARCHAR(6) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_expires_at (expires_at)
);

-- ============================================
-- TABLE: quiz_questions
-- Tabel untuk menyimpan quiz questions
-- ============================================
CREATE TABLE IF NOT EXISTS quiz_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lesson_id INT NOT NULL,
    question TEXT NOT NULL,
    option_a VARCHAR(255),
    option_b VARCHAR(255),
    option_c VARCHAR(255),
    option_d VARCHAR(255),
    correct_answer CHAR(1),
    explanation TEXT,
    order_number INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    INDEX idx_lesson_id (lesson_id)
);

-- ============================================
-- TABLE: quiz_answers
-- Tabel untuk menyimpan jawaban quiz user
-- ============================================
CREATE TABLE IF NOT EXISTS quiz_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    answer CHAR(1),
    is_correct BOOLEAN,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_question_id (question_id)
);

-- ============================================
-- Insert sample data (optional)
-- ============================================

-- Sample users
INSERT INTO users (email, password, full_name) VALUES
('john@example.com', '$2y$12$example_hash_1', 'John Doe'),
('jane@example.com', '$2y$12$example_hash_2', 'Jane Smith');

-- Sample courses
INSERT INTO courses (title, description, instructor, category, level, duration_hours) VALUES
('Frontend Mastery', 'Learn HTML, CSS, and JavaScript', 'Instructor 1', 'Frontend', 'Beginner', 40),
('Backend & API', 'Learn Node.js and Express', 'Instructor 2', 'Backend', 'Intermediate', 50),
('Fullstack Project', 'Build complete web applications', 'Instructor 3', 'Fullstack', 'Intermediate', 60),
('DevOps Essentials', 'Learn DevOps and deployment', 'Instructor 4', 'DevOps', 'Advanced', 30);

-- Sample lessons
INSERT INTO lessons (course_id, title, module, description, duration_minutes, order_number) VALUES
(1, 'HTML Basics', '🏗️ Struktur Web', 'Learn HTML fundamentals', 45, 1),
(1, 'CSS Styling', '🎨 Styling & Layout', 'Learn CSS for beautiful layouts', 50, 2),
(2, 'Node.js Fundamentals', '🔧 Runtime & Environment', 'Introduction to Node.js', 50, 1),
(2, 'Express Framework', '🚀 Web Framework', 'Building servers with Express', 45, 2);

-- Sample enrollments
INSERT INTO enrollments (user_id, course_id, progress_percentage, status) VALUES
(1, 1, 50, 'Active'),
(2, 2, 30, 'Active');

-- Sample lesson progress
INSERT INTO lesson_progress (user_id, lesson_id, is_completed, watch_time_seconds) VALUES
(1, 1, TRUE, 2700),
(1, 2, FALSE, 1500);

COMMIT;
