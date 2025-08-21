# threads_bot1

A Threads bot that automatically posts content every 2 hours.

## Local Development

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Docker Deployment

### Using Docker Compose (Recommended)

1. Build and run the container:

```bash
docker-compose up -d
```

2. View logs:

```bash
docker-compose logs -f
```

3. Stop the container:

```bash
docker-compose down
```

### Using Docker directly

1. Build the image:

```bash
docker build -t threads-bot .
```

2. Run the container:

```bash
docker run -d --name threads-bot threads-bot
```

3. View logs:

```bash
docker logs -f threads-bot
```

## Environment Variables

Make sure to set the following environment variables in your `docker-compose.yml` or when running the container:

- `THREADS_API_KEY`: Your Threads API key
- `DISCORD_WEBHOOK_URL`: Your Discord webhook URL for notifications

## Notes

- The bot runs continuously and posts every 2 hours
- Image files are read from `image_files.txt`
- The container will automatically restart unless explicitly stopped

This project was created using `bun init` in bun v1.0.26. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
