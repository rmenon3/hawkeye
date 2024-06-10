// import cors from '../../middleware/cors';
export const config = {
    maxDuration: 300,
  };
const handler3 = async (req: any, res: any) => {
    try {
        res.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600'); 
        res.setHeader('CDN-Cache-Control', 'max-age=60'); 
        res.setHeader('Cache-Control', 'max-age=10');
        console.log("Inside SEC Handler")
        const {
            query: {  domain },
            method,
          } = req;
        //   console.log(domain, req.query);
        //   res.setHeader('Cache-Control', 'public, s-maxage=1');
        const response = await fetch('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?category='+req.query.category+'&strategy='+req.query.strategy +'&url='+req.query.url+'&alt=json')
        const data = await response.json();
        // debugger;
    //    const data2 =JSON.parse(data.contents)
        // const response = await fetch('http://data.similarweb.com/api/v1/data?domain='+ domain);
        // const data = await response.json();
        console.log("Inside 2 ", JSON.stringify(data))
        return res.end(JSON.stringify(data));
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

export default handler3;

