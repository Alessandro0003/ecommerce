export function corsOriginValidator(
  origin: string | undefined,
  callback: (err: Error | null, allow?: boolean) => void,
) {
  if (!origin) return callback(null, true);
  const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || ['*'];
  if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
}
