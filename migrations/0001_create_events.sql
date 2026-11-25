-- Migration number: 0001 	 2026-11-25T21:12:58.978Z
CREATE TABLE events (
                        id INTEGER PRIMARY KEY,
                        title TEXT NOT NULL,
                        starts_at INTEGER NOT NULL,
                        venue TEXT NOT NULL,
                        address TEXT NOT NULL,
                        published INTEGER NOT NULL DEFAULT 0
                            CHECK (published IN (0, 1))
);

CREATE INDEX events_upcoming
    ON events(published, starts_at);