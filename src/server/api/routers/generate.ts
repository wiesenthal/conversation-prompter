import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { questions, feedback } from "~/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export const generateRouter = createTRPCRouter({
  retrieveExamplesAndGenerateNewQuestion: publicProcedure
    .input(
      z.object({
        limit: z.number().default(25),
        temperature: z.number().min(0).max(1).default(0.5),
      }),
    )
    .mutation(async ({ ctx, input: { limit, temperature } }) => {
      const subquery = ctx.db
        .select({
          id: questions.id,
          text: questions.question,
          avgRanking: sql<number>`COALESCE(AVG(${feedback.rating}), 0)`.as(
            "avg_ranking",
          ),
          randomFactor: sql<number>`(${temperature} * (RANDOM() - 0.5))`.as(
            "random_factor",
          ),
        })
        .from(questions)
        .leftJoin(feedback, eq(feedback.questionId, questions.id))
        .groupBy(questions.id, questions.question)
        .as("subquery");

      const examples = await ctx.db
        .select({
          id: subquery.id,
          text: subquery.text,
          avgRanking: subquery.avgRanking,
          randomFactor: subquery.randomFactor,
        })
        .from(subquery)
        .orderBy(sql`(${subquery.avgRanking} + ${subquery.randomFactor}) DESC`)
        .limit(limit);

      const { text } = await generateText({
        model: anthropic("claude-4-sonnet-20250514"),
        system: "You are facilitating exciting questions for a discussion.",
        prompt: `Generate a new question that is similar to the following examples: ${examples.map((example) => example.text).join("\n")}. Output only the question, no other text.`,
      });

      const [newQuestion] = await ctx.db
        .insert(questions)
        .values({
          question: text,
        })
        .returning();

      return newQuestion;
    }),
});
