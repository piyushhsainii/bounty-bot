import { Probot } from "probot";

export default (app: Probot) => {

  app.log.level = "debug"
  app.log.info("hello")
  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    await context.octokit.issues.createComment(issueComment);
  });
 
    app.on("pull_request_review_comment",async(context)=>{
      const prComment = context.issue({body:"thanks for review this PR"})
      return await context.octokit.issues.createComment(prComment)
    })
    
    app.on("issue_comment",async(context)=>{
      if (context.payload.comment.user.type === "Bot") {
        return;
      }
      app.log.debug("control is in here")
      const prComment = context.issue({body:"thanks for review this PR"})
      return  await context.octokit.issues.createComment(prComment)
    })

  app.on("push", async (context) => {
    // Code was pushed to the repo, what should we do with it?
    console.log("control was here")
    app.log.info("control was here")
    app.log.info(context);
  });
};
