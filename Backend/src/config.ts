interface Port {
  port: number
}

export const PORT: Port = {
  port: Number(process.env.PORT) ?? 3000
}