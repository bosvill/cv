export const corsOptions = {
	origin: 'http://localhost:5173', //[]
	credentials: true,
	optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false
}
