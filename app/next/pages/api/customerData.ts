// import cors from '../../middleware/cors';
const handler = async (req: any, res: any) => {
    try {
        console.log("Inside Handler")
        const {
            query: {  domain },
            method,
          } = req;
          console.log(domain, method);
          let urlDomain = domain.replace(/^https?:\/\//i, "");

// // import cors from "cors";

          // Remove 'www.'
          urlDomain = urlDomain.replace(/^www\./i, "");
        //   cors(req, res, async () => {
        //     // Your API logic here
        //     const response = await fetch('http://data.similarweb.com/api/v1/data?domain='+ urlDomain);
        //     const data = await response.json();
        //     console.log("1", data);
        //     res.status(200).json(data);
        //   });
        const response = await fetch('https://api.allorigins.win/get?url=http://data.similarweb.com/api/v1/data?domain='+ urlDomain)
 const data = await response.json();
        // debugger;
       const data2 =JSON.parse(data.contents)
        // const response = await fetch('http://data.similarweb.com/api/v1/data?domain='+ domain);
        // const data = await response.json();
        console.log("Inside 2 ", JSON.stringify(data2))
        return res.end(data2);
    } catch (err:any) {
        return res.end(JSON.stringify({'error':err.message}));
    }

}

// const corsMiddleware = cors({
//     origin: '*', // Allow requests from any origin (you can specify specific origins instead)
//     methods: ['GET', 'POST'], // Allow only specific methods
//     allowedHeaders: ['Content-Type'], // Allow only specific headers
// });

// export default function handler(req: any, res: any) {
//     // Apply CORS middleware
//     corsMiddleware(req, res, async () => {
//         // Your API logic here
//         const {
//             query: { domain },
//             method,
//         } = req;
//         console.log(domain, method);
//         const response = await fetch('http://data.similarweb.com/api/v1/data?domain=' + domain);
//         const data = await response.json();
//         console.log(JSON.stringify(data));
//         res.status(200).json(data);
//     });
// }

// import { NextRequest } from 'next/server'
// import cors from '../../lib/cors'

// export const config = {
//   runtime: 'edge',
// }

// export default async function handler(req: NextRequest) {
//   // `cors` also takes care of handling OPTIONS requests
//   return cors(
//     req,
//     new Response(JSON.stringify({ message: 'Hello World!' }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     })
//   )
// }

export default handler;

// export default function handler(req:any, res:any, next:any) {
//     async function getURI(url:any) {
//       try {
//         // const response:any = await fetch('http://data.similarweb.com/api/v1/data?domain='+ url);;
//         const response:any = await fetch('https://api.allorigins.win/get?url=http://data.similarweb.com/api/v1/data?domain=sephora.com'+ url);;
//         const data = await response.json();
//         return res.end(JSON.stringify(data));
//         // if (response.status !== 200) {
//         //   return res.status(response.status).json({ type: 'error', message: response.statusText });
//         // } else {
//         //     return res.status(response.status).json(JSON.stringify(response.data));
//         // }
//       } catch (error:any) {
//         console.log(error.message, "ERR")
//         // return res.status(500).json({ type: 'error', message: error.message });
//       }
//     } 
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Content-Type', 'application/json');
//     getURI(req.query.domain);
//   }