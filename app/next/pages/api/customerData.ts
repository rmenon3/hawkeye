// import cors from '../../middleware/cors';
// const handler = async (req: any, res: any) => {
//     try {
//         console.log("Inside Handler")
//         const {
//             query: {  domain },
//             method,
//           } = req;
//           console.log(domain, method);
//           let urlDomain = domain.replace(/^https?:\/\//i, "");

import cors from "cors";

//           // Remove 'www.'
//           urlDomain = urlDomain.replace(/^www\./i, "");
//           cors(req, res, async () => {
//             // Your API logic here
//             const response = await fetch('http://data.similarweb.com/api/v1/data?domain='+ urlDomain);
//             const data = await response.json();
//             console.log("1", data);
//             res.status(200).json(data);
//           });
//         // const response = await fetch('http://data.similarweb.com/api/v1/data?domain='+ urlDomain);
//         // const data = await response.json();
//         // console.log(JSON.stringify(data))
//         // const response = await fetch('http://data.similarweb.com/api/v1/data?domain='+ domain);
//         // const data = await response.json();
//         // return res.end(JSON.stringify(data));
//     } catch (err:any) {
//         return res.end(JSON.stringify({'error':err.message}));
//     }

// }

const corsMiddleware = cors({
    origin: '*', // Allow requests from any origin (you can specify specific origins instead)
    methods: ['GET', 'POST'], // Allow only specific methods
    allowedHeaders: ['Content-Type'], // Allow only specific headers
});

export default function handler(req: any, res: any) {
    // Apply CORS middleware
    corsMiddleware(req, res, async () => {
        // Your API logic here
        const {
            query: { domain },
            method,
        } = req;
        console.log(domain, method);
        const response = await fetch('http://data.similarweb.com/api/v1/data?domain=' + domain);
        const data = await response.json();
        console.log(JSON.stringify(data));
        res.status(200).json(data);
    });
}
// export default handler;