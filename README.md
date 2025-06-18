# Conversation Prompter

An AI-powered application that generates thoughtful conversation questions to facilitate meaningful discussions. Built with Next.js, TypeScript, and Claude AI.

## ✨ Features

- **AI-Powered Question Generation**: Uses AI to generate engaging conversation questions for AI discussion groups
- **Smart Feedback System**: Users can rate questions (👍/👎) and provide written feedback
- **Adaptive Learning**: Questions are generated based on previously well-rated examples using a weighted ranking system
- **Modern UI**: Clean, responsive interface with gradient backgrounds and intuitive controls
- **Database-Backed**: PostgreSQL database stores questions and feedback for continuous improvement

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: tRPC, Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: Anthropic Claude 4 Sonnet via AI SDK
- **Development**: ESLint, Prettier, Turbo

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker (for local database)
- Anthropic API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd conversation-prompter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/conversation-prompter"
   ANTHROPIC_API_KEY="your-anthropic-api-key"
   ```

4. **Start the database**
   ```bash
   ./start-database.sh
   ```

5. **Run database migrations**
   ```bash
   npm run db:push
   ```

6. **Seed the database with initial questions**
   ```bash
   npm run db:seed
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Usage

1. **Generate Questions**: Click "New Question" to generate a new conversation starter
2. **Provide Feedback**: 
   - Use 👍/👎 buttons to rate questions
   - Add written feedback in the text field
   - Press Enter or click 📬 to submit feedback
3. **Continuous Improvement**: The AI learns from your feedback to generate better questions over time

## 🗄 Database Schema

The application uses two main tables:

- **questions**: Stores generated questions with timestamps
- **feedback**: Stores user ratings and written feedback linked to questions

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbo
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio for database management
- `npm run db:seed` - Seed database with initial questions
- `npm run lint` - Run ESLint
- `npm run format:write` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking

## 🏗 Architecture

The application follows a modern full-stack architecture:

- **Frontend**: React components with tRPC for type-safe API calls
- **API Layer**: tRPC routers handle question generation and feedback submission
- **AI Integration**: Claude AI generates questions based on highly-rated examples
- **Database**: Drizzle ORM with PostgreSQL for data persistence
- **Feedback Loop**: User ratings influence future question generation through weighted selection

## 🤖 AI Question Generation

The system uses a sophisticated approach to generate relevant questions:

1. **Example Selection**: Retrieves existing questions with their average ratings
2. **Weighted Ranking**: Combines user feedback scores with randomization (temperature)
3. **AI Prompt**: Sends top-rated examples to Claude AI as context
4. **Generation**: Claude generates a new question similar to the best examples
5. **Storage**: New questions are saved to the database for future feedback

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude AI | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 📋 Next Steps

Currently, there is a big flaw in the rating system because questions are always generated anew. The ratings are used for pulling in highly-rated questions as examples to generate the next question. This means that a question can never get more than one rating. We need to decide on logic to decide when to re-use a question or generate a new one.

Also, want to add in-session learning such as increasing temperature if user presses "no" many times in a row.
