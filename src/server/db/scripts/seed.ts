import { db } from "../";
import { questions } from "../schema";

const questionData = [
  "What's the most human moment you've experienced with AI?",
  "Who in your community sees potential in you that you don't see yourself?",
  "What trust-building gesture changed your life?",
  "If AI could solve one human problem, what would you choose?",
  "What's your biggest fear about the future of technology?",
  "When did someone's faith in you exceed your own?",
  "What community ritual do you wish existed?",
  "How do you stay human in a digital world?",
  "What's the bravest conversation you've had about AI ethics?",
  "Who taught you how to truly listen?",
  "What assumption about AI did you have to unlearn?",
  "Where do you find genuine connection in an algorithmic world?",
  "What's your secret superpower for building trust?",
  "If you could preserve one human trait that AI can't replicate, what would it be?",
  "What community wound are you helping to heal?",
  "When did technology bring you closer to someone unexpectedly?",
  "What's the most vulnerable thing you've shared online?",
  "Who in your network challenges your thinking most lovingly?",
  "What bridge are you building between old and new ways?",
  "How has AI surprised you with compassion?",
  "What trust have you broken that still needs mending?",
  "When do you feel most authentic in digital spaces?",
  "What human wisdom should we encode in every AI?",
  "Who's the unexpected mentor technology brought into your life?",
  "What community need keeps you up at night?",
  "How do you protect your humanity from optimization?",
  "What's the hardest truth about building trust?",
  "When did you realize connection beats perfection?",
  "What AI breakthrough would restore your faith in humanity?",
  "Who saw through your digital mask to the real you?",
  "What ritual of connection do you practice daily?",
  "How has technology amplified your empathy?",
  "What's your biggest blindspot about human nature?",
  "When did a stranger's digital kindness change your day?",
  "What community value would you hardcode into society?",
  "How do you stay present in an attention economy?",
  "What trust experiment transformed your relationships?",
  "Who holds space for your whole self, online and off?",
  "What's the question about AI you're afraid to ask?",
  "When did you choose human messiness over digital perfection?",
  "What invisible labor builds your community?",
  "How do you practice digital vulnerability safely?",
  "What AI capability makes you most hopeful?",
  "Who believed in your vision before you did?",
  "What community healing have you witnessed?",
  "When do machines remind you of what's human?",
  "What trust muscle are you strengthening?",
  "How has technology revealed your blind spots about connection?",
  "What community dream are you brave enough to voice?",
  "If you could teach AI one thing about being human, what would it be?",
];

async function seed() {
  console.log("🌱 Seeding questions...");

  try {
    // Clear existing questions (optional - remove if you want to append)
    console.log("✅ Cleared existing questions");

    // Insert all questions
    const insertedQuestions = await db
      .insert(questions)
      .values(questionData.map((q) => ({ question: q })))
      .returning();

    console.log(`✅ Successfully seeded ${insertedQuestions.length} questions`);

    // Log a few examples
    console.log("\n📝 Sample questions:");
    insertedQuestions.slice(0, 3).forEach((q, i) => {
      console.log(`${i + 1}. ${q.question}`);
    });
    console.log("...");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log("\n✨ Seeding completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Seeding failed:", error);
    process.exit(1);
  });
