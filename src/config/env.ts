const MIN_SECRET_LENGTH = 32;

function requireEnv(name: string): string {
    const value = process.env[name];

    if (!value || value.trim().length === 0) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

function requireSecret(name: string): string {
    const value = requireEnv(name);

    if (value.length < MIN_SECRET_LENGTH) {
        throw new Error(
            `${name} must be at least ${MIN_SECRET_LENGTH} characters long`
        );
    }

    return value;
}

export function validateEnv(): void {
    requireEnv("PORT");
    requireEnv("DB_NAME");
    requireEnv("DB_USER");
    requireEnv("DB_PASSWORD");
    requireEnv("DB_HOST");
    requireEnv("DB_PORT");
    requireSecret("JWT_ACCESS_SECRET");
    requireSecret("JWT_REFRESH_SECRET");
}

export function getJwtAccessSecret(): string {
    return requireSecret("JWT_ACCESS_SECRET");
}

export function getJwtRefreshSecret(): string {
    return requireSecret("JWT_REFRESH_SECRET");
}
