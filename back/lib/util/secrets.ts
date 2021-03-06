export const MONGODB_URI = process.env["MONGODB_URI"] || 'mongodb://localhost:27017/ripley';

if (!MONGODB_URI) {
    console.log("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}

export const JWT_SECRET = process.env["JWT_SECRET"]|| 'JWTSCRET';

if (!JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}