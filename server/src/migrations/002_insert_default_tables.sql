DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'tables'
    ) THEN
        RAISE NOTICE 'Table "tables" does not exist. Skipping insertion.';
    ELSE
        IF NOT EXISTS (SELECT 1 FROM tables WHERE table_number = 1) THEN
            INSERT INTO tables (table_number, capacity) VALUES
                (1, 4),
                (2, 6),
                (3, 8),
                (4, 10),
                (5, 5),
                (6, 7),
                (7, 3),
                (8, 6),
                (9, 9),
                (10, 4);
        END IF;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'users'
    ) THEN
        RAISE NOTICE 'Table "users" does not exist. Skipping insertion.';
    ELSE
        IF NOT EXISTS (
            SELECT 1 FROM users WHERE phone_number = '+380961234567'
        ) THEN
            INSERT INTO users (name, phone_number) 
            VALUES ('Alex', '+380961234567');
        END IF;
    END IF;
END $$;
