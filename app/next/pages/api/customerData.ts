import cors from '../../middleware/cors';
const handler = async (req: any, res: any) => {
    try {
        console.log("Inside Handler")
        const {
            query: {  domain },
            method,
          } = req;
          console.log(domain, method);
          let urlDomain = domain.replace(/^https?:\/\//i, "");

          // Remove 'www.'
          urlDomain = urlDomain.replace(/^www\./i, "");
          cors(req, res, async () => {
            // Your API logic here
            const response = await fetch('http://data.similarweb.com/api/v1/data?domain='+ urlDomain);
            const data = await response.json();
            console.log("1", data);
            res.status(200).json(data);
          });
        // const response = await fetch('http://data.similarweb.com/api/v1/data?domain='+ urlDomain);
        // const data = await response.json();
        // console.log(JSON.stringify(data))
        // const response = await fetch('http://data.similarweb.com/api/v1/data?domain='+ domain);
        // const data = await response.json();
        // return res.end(JSON.stringify(data));
    } catch (err:any) {
        return res.end(JSON.stringify({'error':err.message}));
    }

}
export default handler;