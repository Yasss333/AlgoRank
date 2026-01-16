import axios from "axios";

/**
 * Map language names to Judge0 language IDs
 */
export const getJudge0LanguageId = (language) => {
  const languageMap = {
    PYTHON: 71
    // JAVA: 62,
    // JAVASCRIPT: 63,
  };

  return languageMap[language?.toUpperCase()];
};

/**
 * Sleep helper
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Submit batch of solutions to Judge0
 */
export const submitBatch = async (submissions) => {
  try {
    const { data } = await axios.post(
      `${process.env.JUDGE0_API_URL}submissions/batch`,
      { submissions,
          base64_encoded: false,  
       },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // data = [{ token: "..." }, { token: "..." }]
    return data;
  } catch (error) {
    console.error(
      "Judge0 batch submission failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Poll Judge0 until all submissions are done
 */
export const pollBatchResults = async (tokens, retries = 25) => {
  if (retries === 0) {
    throw new Error("Judge0 polling timeout");
  }

  const { data } = await axios.get(
    `${process.env.JUDGE0_API_URL}submissions/batch`,
    {
      params: {
        tokens: tokens.join(","),
        base64_encoded: false,
      },
    }
  );

  const results = data.submissions;
console.log(
  results.map(r => ({
    status: r.status.id,
    desc: r.status.description
  }))
);

  const isAllDone = results.every(
    (r) => ![1, 2].includes(r.status.id)
  );

  if (isAllDone) {
    return results;
  }

  await new Promise((r) => setTimeout(r, 400));
  return pollBatchResults(tokens, retries - 1);
};

