import { PromptTemplate } from "@langchain/core/prompts";
import { llm } from "./keys";
import { StringOutputParser } from "@langchain/core/output_parsers";

const formatConvoHistory = (chats: any) => {
  return chats
    .map(
      (chat: { question: string; answer: string }) =>
        `Human: ${chat.question || "No message"}\nAI: ${
          chat.answer || "No response"
        }`
    )
    .join("\n\n");
};

export const GenerateMHA = async (
  prevChats: {
    question: string | null | undefined;
    answer: string | null | undefined;
  }[]
) => {
  const MoodScoreTemplate = `
   Analyze the following chat history between the user and the AI to generate an overall mood score for the user out of 10, followed by a direct comment addressing the user's mood.

   Format:
   - Provide the rating as a single number out of 10 (e.g., 1/10, 5/10) on the first line.
   - On the next line, speak directly to the user in a supportive tone, using plain sentences without semicolons or excessive punctuation (only commas if needed).

   Use the following metrics for analysis:
   1. Sentiment analysis of messages
   2. Emotional word usage
   3. Expression of positive vs. negative thoughts
   4. Self-reported mood states

   Context from Previous Chats: {prevChats}

   Mood Analysis:
`;

  const AnxietyLevelTemplate = `
   Analyze the following chat history between the user and the AI to generate an overall anxiety level score for the user out of 10, followed by a direct comment addressing the user's anxiety.

   Format:
   - Provide the rating as a single number out of 10 (e.g., 1/10, 5/10) on the first line.
   - On the next line, speak directly to the user in a supportive tone, using plain sentences without semicolons or excessive punctuation (only commas if needed).

   Guidelines:
   - If user has not said something that genuinely raises concerns about their anxiety in the chat history, assign a score of 0/10 and craft an encouraging comment to assure them that their chats don't indicate any significant anxiety.

   Use the following metrics for analysis:
   1.Frequency of anxiety-related keywords
   2.Discussion of worry or stress
   3.Physical symptom mentions
   4.Future-focused concerns

   Context from Previous Chats: {prevChats}

   Anxiety Level Analysis:
`;

  const EnergyLevelTemplate = `
   Analyze the following chat history between the user and the AI to generate an overall energy level score for the user out of 10, followed by a direct comment addressing the user's energy.

   Format:
   - Provide the rating as a single number out of 10 (e.g., 1/10, 5/10) on the first line.
   - On the next line, speak directly to the user in a supportive tone, using plain sentences without semicolons or excessive punctuation (only commas if needed).

   Use the following metrics for analysis:
   1. Activity descriptions
   2.Vitality indicators in language
   3.Reports of fatigue or motivation
   4.Daily routine discussions

   Context from Previous Chats: {prevChats}

   Energy Level Analysis:
`;

  const SocialEngagementTemplate = `
   Analyze the following chat history between the user and the AI to generate an overall social engagement score for the user out of 10, followed by a direct comment addressing the user's social engagement level.

   Format:
   - Provide the rating as a single number out of 10 (e.g., 1/10, 5/10) on the first line.
   - On the next line, speak directly to the user in a supportive tone, using plain sentences without semicolons or excessive punctuation (only commas if needed).

   Guidelines:
   - If there are no mentions of social engagement (such as interactions, relationships, or social activities) in the chat history, assign a score of 0/10 and craft a gentle comment encouraging the user to share more about their social experiences if they wish.

   Use the following metrics for analysis:
   1. Mentions of social interactions
   2. Quality of relationships
   3. Participation in social activities
   4. Communication patterns

   Context from Previous Chats: {prevChats}

   Social Engagement Analysis:
`;

  const CopingResilienceTemplate = `
   Analyze the following chat history between the user and the AI to generate an overall coping resilience level score for the user out of 10, followed by a direct comment addressing the user's coping resilience.

   Format:
   - Provide the rating as a single number out of 10 (e.g., 1/10, 5/10) on the first line.
   - On the next line, speak directly to the user in a supportive tone, using plain sentences without semicolons or excessive punctuation (only commas if needed).

   Use the following metrics for analysis:
   1. Problem-solving approaches
   2.Adaptation to challenges
   3.Use of coping strategies
   4.Recovery from setbacks
   5.Solution-focused language

   Context from Previous Chats: {prevChats}

   Coping Resilience Level Analysis:
`;

  const MoodScoreChain = PromptTemplate.fromTemplate(MoodScoreTemplate)
    .pipe(llm)
    .pipe(new StringOutputParser());
  const AnxietyLevelChain = PromptTemplate.fromTemplate(AnxietyLevelTemplate)
    .pipe(llm)
    .pipe(new StringOutputParser());
  const EnergyLevelChain = PromptTemplate.fromTemplate(EnergyLevelTemplate)
    .pipe(llm)
    .pipe(new StringOutputParser());
  const SocialEngagementChain = PromptTemplate.fromTemplate(
    SocialEngagementTemplate
  )
    .pipe(llm)
    .pipe(new StringOutputParser());
  const CopingResilienceChain = PromptTemplate.fromTemplate(
    CopingResilienceTemplate
  )
    .pipe(llm)
    .pipe(new StringOutputParser());

  const MoodScore = await MoodScoreChain.invoke({
    prevChats: formatConvoHistory(prevChats),
  });
  const AnxietyLevel = await AnxietyLevelChain.invoke({
    prevChats: formatConvoHistory(prevChats),
  });
  const EnergyLevel = await EnergyLevelChain.invoke({
    prevChats: formatConvoHistory(prevChats),
  });
  const SocialEngagement = await SocialEngagementChain.invoke({
    prevChats: formatConvoHistory(prevChats),
  });
  const CopingResilience = await CopingResilienceChain.invoke({
    prevChats: formatConvoHistory(prevChats),
  });

  return {
    moodScore: {
      rating: MoodScore.split("\n")[0],
      comment: MoodScore.split("\n")[1],
    },
    anxietyScore: {
      rating: AnxietyLevel.split("\n")[0],
      comment: AnxietyLevel.split("\n")[1],
    },
    energyScore: {
      rating: EnergyLevel.split("\n")[0],
      comment: EnergyLevel.split("\n")[1],
    },
    socialScore: {
      rating: SocialEngagement.split("\n")[0],
      comment: SocialEngagement.split("\n")[1],
    },
    copingScore: {
      rating: CopingResilience.split("\n")[0],
      comment: CopingResilience.split("\n")[1],
    },
  };
};

export default GenerateMHA;
