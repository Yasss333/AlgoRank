import { runCodeWithPiston } from "../libs/pistonlibs.js";
import { db } from "../libs/db.js";

export const executionRouter = async (req, res) => {
  const {
    source_code,
    langauge_id, // "PYTHON" | "JAVASCRIPT" | "CPP"
    stdin,
    expected_outputs,
    problemID,
  } = req.body;

  const userID = req.user.id;

  try {
    // 1️⃣ Validate testcases
    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return res.status(400).json({
        message: "Invalid or missing testcases",  
      });
    }

    const executions = [];

    for (let i = 0; i < stdin.length; i++) {
      const result = await runCodeWithPiston({
        language: langauge_id,
        sourceCode: source_code,
        stdin: stdin[i],
      });

      executions.push(result);
    }

    let ispassed = true;
    // 3️⃣ Judge results
    const results = executions.map((result, index) => {
      const actual = result.stdout?.trim();
      const expected = expected_outputs[index]?.trim();

      let ispassed = actual === expected;
      if (!ispassed) ispassed = false;
      //  console.log(`Testcases #${index+1}`);
      //  console.log(`Input for testcase ${stdin[index]}`);
      //  console.log(`Ouput executed By Piston API : ${actual}`)
      //  console.log(`REal REsult ${expected}`);
      //  console.log("Result : ", actual===expected);

      return {
        testCase: index + 1,
        passed: ispassed,
        input: stdin[index],
        stdout: result.stdout,
        expected: expected,
        stderr: result.stderr || null,
        compileOutput: result.compileOutput || null,
        status: result.status,
        memory: result.memory ? `${result.memory} kb` : undefined,
        time: result.time ? `${result.time}seconds` : undefined,
        exitCode: result.exitCode,
      };
    });

    // console.log(results);
    //Storing in the DB
    const submission = await db.submission.create({
      data: {
        userID,
        problemID,
        userID,

        sourceCode: source_code,
        // language:getLangaugeName(langauge_id)
        language: langauge_id,
        stdin: stdin.join("\n"),
        stdout: JSON.stringify(
          results.map((r) => {
            r.actual;
          })
        ),
        stderr: results.some((r) => r.stderr)
          ? JSON.stringify(results.map((r) => r.stderr))
          : null,
        compileOutput: results.some((r) => r.compileOutput)
          ? JSON.stringify(results.map((r) => r.compileOutput))
          : null,
        status: ispassed ? "Accepted " : "Wrong Answer",

        memory: results.some((r) => r.memory)
          ? JSON.stringify(results.map((r) => r.memory))
          : "Not available rn",
        time: results.some((r) => r.time)
          ? JSON.stringify(results.map((r) => r.time))
          : "Not available rn"
      },
    });
    //Marking Completed for User if passed
    if (ispassed) {
      await db.problemSolved.upsert({
        where: {
          userID_problemID: {
            userID,
            problemID,
          },
        },
        update: {},
        create: {
          userID,
          problemID,
        },
      });
    }
    //saving indiviudal testcases

    const testCaseResults = results.map((result) => ({
      submissionID: submission.id,
      testCase: result.testCase,
      passed: result.passed,
      stdout: result.stdout,
      expected: result.expected,
      stderr: result.stderr,
      compileOutput: result.compileOutput,
      status: result.status,
      memory: result.memory,
      time: result.time,
    }));
    //store in db 
    await db.testcases.createMany({
      data:
        testCaseResults
      
    })
    //for frontend display
    const submissionWithTestcases=await db.submission.findUnique({
      where:{
        id:submission.id
      },
      include:{
        testcases:true
      }
    })

    return res.status(200).json({
      success:true,
      message: "Code executed ! Successfully",
      submission:submissionWithTestcases
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Execution failed",
      error: error.message,
    });
  }
};
