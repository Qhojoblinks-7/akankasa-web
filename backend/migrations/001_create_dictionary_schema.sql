-- Phase 1: Dictionary schema migration
-- Designed for PostgreSQL with UTF-8 (ak-GH collation where supported)

-- Ensure UTF-8 character encoding support for Akan orthography
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

CREATE TYPE part_of_speech_enum AS ENUM (
    'noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection', 'proverb', 'phrase'
);

CREATE TYPE dialect_enum AS ENUM (
    'asante_twi', 'akuapem_twi', 'fante', 'general_akan'
);

CREATE TABLE dictionary_terms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    primary_akan VARCHAR(255) NOT NULL,
    english_translation TEXT NOT NULL,
    part_of_speech part_of_speech_enum NOT NULL,
    etymology TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dialect_variations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    term_id UUID REFERENCES dictionary_terms(id) ON DELETE CASCADE,
    dialect dialect_enum NOT NULL,
    spelling VARCHAR(255) NOT NULL,
    phonetic_script VARCHAR(255),
    example_sentence_akan TEXT,
    example_sentence_english TEXT
);

CREATE TABLE audio_pronunciations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    term_id UUID REFERENCES dictionary_terms(id) ON DELETE CASCADE,
    dialect dialect_enum NOT NULL,
    audio_url TEXT NOT NULL,
    speaker_gender VARCHAR(20),
    is_verified BOOLEAN DEFAULT FALSE
);

-- Indexing for instant search execution
CREATE INDEX idx_akan_trgm ON dictionary_terms USING gin (primary_akan gin_trgm_ops);
CREATE INDEX idx_english_trgm ON dictionary_terms USING gin (english_translation gin_trgm_ops);
CREATE INDEX idx_term_published ON dictionary_terms(is_published);
CREATE INDEX idx_dialect_term ON dialect_variations(term_id);
CREATE INDEX idx_audio_term ON audio_pronunciations(term_id);

-- Admin users table
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'editor',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
