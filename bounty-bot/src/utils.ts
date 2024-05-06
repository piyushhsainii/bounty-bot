import axios from "axios";


export const extractAmount = (comment: string) => {
    const bountyExtractor = /\/bounty\s+(\$?\d+|\d+\$)/;
  
    const match = comment.match(bountyExtractor);
    return match ? match[1] : null;
  };


  export const isBountyComment = (comment:string) => {
   return comment.trim().toLowerCase().startsWith('/bounty')
  }
  

  export const getOwnerId = async ({ id }: { id: number }) => {
    try {
      const endpoint = process.env.ADMIN_SERVER_URL + '/api/installation/' + id;
      const response = await axios.get(endpoint, {
        headers: {
          'x-bot-token': process.env.BOT_SECRET!,
        },
      });

      return response.data.addedById;
      
    } catch (error: any) {
      console.error(error);
    }
  };