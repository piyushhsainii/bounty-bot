import { Probot } from "probot";

export default (app: Probot) => {

  app.log.level = "debug"
  app.log.info("hello")
  console.log("hello")
  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    await context.octokit.issues.createComment(issueComment);
  });
 
  app.on("push", async (context) => {
    // Code was pushed to the repo, what should we do with it?
    console.log("control was here")
    app.log.info("control was here")
    app.log.info(context);
  });
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
