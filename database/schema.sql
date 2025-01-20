-- Users table for parent accounts
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE students (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    grade_level INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Platforms table (Time4Learning, Khan Academy, etc)
CREATE TABLE platforms (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Subjects table
CREATE TABLE subjects (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Units/Modules table
CREATE TABLE units (
    id UUID PRIMARY KEY,
    subject_id UUID REFERENCES subjects(id),
    platform_id UUID REFERENCES platforms(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    grade_level INTEGER
);

-- Daily reports table
CREATE TABLE daily_reports (
    id UUID PRIMARY KEY,
    student_id UUID REFERENCES students(id),
    report_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    todays_highlight TEXT,
    questions TEXT,
    parent_reviewed BOOLEAN DEFAULT FALSE,
    parent_review_date TIMESTAMP,
    parent_comments TEXT
);

-- Weekly reports table
CREATE TABLE weekly_reports (
    id UUID PRIMARY KEY,
    student_id UUID REFERENCES students(id),
    week_start_date DATE NOT NULL,
    week_end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    parent_approved BOOLEAN DEFAULT FALSE,
    parent_approval_date TIMESTAMP,
    aggregated_from_daily BOOLEAN DEFAULT TRUE,
    notes TEXT
);

-- Achievement system tables
CREATE TABLE achievements (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(50),
    points INTEGER DEFAULT 0,
    category VARCHAR(50),
    required_count INTEGER DEFAULT 1
);

CREATE TABLE student_achievements (
    id UUID PRIMARY KEY,
    student_id UUID REFERENCES students(id),
    achievement_id UUID REFERENCES achievements(id),
    earned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress_count INTEGER DEFAULT 0
);

-- Reward system tables
CREATE TABLE reward_tiers (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    points_required INTEGER NOT NULL,
    description TEXT
);

CREATE TABLE rewards (
    id UUID PRIMARY KEY,
    tier_id UUID REFERENCES reward_tiers(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    points_cost INTEGER NOT NULL
);

CREATE TABLE student_rewards (
    id UUID PRIMARY KEY,
    student_id UUID REFERENCES students(id),
    reward_id UUID REFERENCES rewards(id),
    redeemed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    points_spent INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending'
);