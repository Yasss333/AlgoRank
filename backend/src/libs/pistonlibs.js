import axios from "axios";

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

const languageMap = {
  PYTHON: { language: "python", version: "3.10.0" },
  JAVASCRIPT: { language: "javascript", version: "18.15.0" },
  CPP: { language: "cpp", version: "10.2.0" }
};

export const runCodeWithPiston = async ({
  language, 
  sourceCode,
  stdin
}) => {
  const config = languageMap[language.toUpperCase()];
  if (!config) throw new Error("Unsupported language");

  const { data } = await axios.post(PISTON_URL, {
    language: config.language,
    version: config.version,
    files: [{ content: sourceCode }],
    stdin
  });

  return {
    stdout: data.run.stdout,
    stderr: data.run.stderr,
    exitCode: data.run.code
  };
};


// FOR JUDGE0 NEEDED
// export function getLangaugeName(langauge_id){
//   const LANGUAGE_NAME={
//       74:"TypeScript",
//       63:"JavaScript",
//       71:"Python",
//       62:"Java"
//   }
//   return LANGUAGE_NAME[langauge_id]|| "Langauge Not supported Yet   "
// }