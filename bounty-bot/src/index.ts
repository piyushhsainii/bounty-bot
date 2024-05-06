import { Probot } from "probot";
import { extractAmount, isBountyComment } from "./utils.js";
import dotenv from 'dotenv'

export default (app: Probot) => {
  dotenv.config()
  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    await context.octokit.issues.createComment(issueComment);
  });
 
    app.on("issue_comment",async(context)=>{
      //stops the handler from running if bot comments
      if (context.payload.comment.user.type === "Bot") {
        return;
      }
      console.log("point break 1")

      const commentBody = context.payload.comment.body
      app.log.debug(commentBody)        //

      const commenter = context.payload.comment.user.login
      const isRepoOwner = context.payload.repository.owner.login === commenter
      // verifies if the comment is created 
      // const id = await getOwnerId({ id: context.payload.repository.id });
      const admin = process.env.ADMIN_USERNAME
      console.log("point break 2")
      console.log(isRepoOwner,'1')
      console.log(commenter,'2')
      console.log(admin,'3')
      if(admin !== commenter) return;
      if(
        !isRepoOwner &&
        !admin?.includes(commenter)
      ) return ;
      console.log("point break 2.5")

      if (!isBountyComment(commentBody)) return;
      console.log("point break 3")

        // checking if the body is appropiaate and extracting the bounty
        const amount = extractAmount(commentBody)?.replace("$","")
  
        // if comment body is unappropiate
         if (!amount) {
          const issueComment = context.issue({
          body: `Please send a valid bounty amount @${context.payload.sender.login}. Example command to send bounty: "/bounty $300", this will send $300 to contributor. `,
        });
        await context.octokit.issues.createComment(issueComment);
        return;
      }
        
        const prComment = context.issue({
          body: `Congratulations!!! @${context.payload.issue.user.login} for winning $${amount}. Visit ${process.env.CONTRIBUTOR_SERVER_URL} to claim bounty.`
        })
  
        return  await context.octokit.issues.createComment(prComment)
    })



    app.on("pull_request.opened",async(context)=>{
      const prComment = context.issue({body:"thanks for reviewing this PR"})
      return  await context.octokit.issues.createComment(prComment)
    })
   

};
