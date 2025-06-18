"use client";

import { api } from "~/trpc/react";
import { useState } from "react";

export const QuestionPrompt = () => {
  const {
    mutate: generateQuestion,
    data: question,
    isPending,
  } = api.generate.retrieveExamplesAndGenerateNewQuestion.useMutation();

  const { mutate: submitFeedback } = api.feedback.submit.useMutation();

  const [feedback, setFeedback] = useState<{
    rating?: number;
    feedback?: string;
  }>({});

  const handleFeedbackSubmit = () => {
    if (question?.id) {
      submitFeedback({
        questionId: question.id,
        ...feedback,
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 text-xl">
      <div>{isPending ? "Generating..." : question?.question}</div>

      <div className="flex items-center gap-2">
        <button
          className="cursor-pointer rounded-md bg-white/10 px-4 py-2 text-white hover:bg-white/20 disabled:opacity-50 disabled:pointer-events-none"
          disabled={isPending}
          onClick={() =>
            generateQuestion({
              limit: 10,
              temperature: 0.5,
            })
          }
        >
          New Question
        </button>
      </div>

      {question && !isPending && (
        <div className="flex w-full max-w-md items-center gap-2 rounded-md border border-white/10 p-2">
          <button
            className={`cursor-pointer rounded-md bg-green-500/30 px-3 py-2 text-2xl hover:brightness-125 ${
              feedback.rating === 1 ? "ring-2 ring-green-500" : ""
            }`}
            onClick={() =>
              setFeedback((prev) => ({
                ...prev,
                rating: prev.rating === 1 ? undefined : 1,
              }))
            }
            title="Thumbs up"
          >
            👍
          </button>
          <button
            className={`cursor-pointer rounded-md bg-red-500/30 px-3 py-2 text-2xl hover:brightness-125 ${
              feedback.rating === -1 ? "ring-2 ring-red-500" : ""
            }`}
            onClick={() =>
              setFeedback((prev) => ({
                ...prev,
                rating: prev.rating === -1 ? undefined : -1,
              }))
            }
            title="Thumbs down"
          >
            👎
          </button>
          <input
            type="text"
            placeholder="Feedback..."
            value={feedback.feedback}
            onChange={(e) =>
              setFeedback((prev) => ({ ...prev, feedback: e.target.value }))
            }
            className={`w-full rounded-md border border-white/10 px-3 py-2 text-white placeholder-white/60 focus:border-white/20 focus:outline-none ${feedback.feedback ? "ring-2 ring-white" : ""}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" && feedback.feedback?.trim())
                handleFeedbackSubmit();
            }}
          />
          <button
            className="cursor-pointer rounded-md bg-white/10 px-4 py-2 text-white hover:bg-white/20 disabled:opacity-50 disabled:pointer-events-none"
            onClick={handleFeedbackSubmit}
            disabled={!feedback.rating && !feedback.feedback}
          >
          📬
          </button>
        </div>
      )}
    </div>
  );
};
