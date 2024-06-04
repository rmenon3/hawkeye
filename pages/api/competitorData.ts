
const handler = async (req: any, res: any) => {
    try {
        console.log("Inside Handler")
        const {
            query: {  domain },
            method,
          } = req;
          let urlDomain = domain.replace(/^https?:\/\//i, "");

          // Remove 'www.'
          urlDomain = urlDomain.replace(/^www\./i, "");
        console.log(urlDomain, method);
        const response = await fetch('http://aranking.io/site-analysis/google_com');
        // console.log("resp",response)
        const data = await response.text();
        const token = data.match(/data-token=\s*"(.*?)\"\s*/);
        const arankToken = token[1];
        // console.log("doc",data)
        // console.log("arankToken",arankToken)
        // var parser = new DOMParser();
        const response2 = await fetch('https://aranking.io/aranking/site/get-competitor-info?site='+urlDomain,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': ` ${arankToken}`, // notice the Bearer before your token
            }
        });
          const data2 = await response2.json();
          console.log(JSON.stringify(data2))
        // var doc = parser.parseFromString(data, "text/html");
        // console.log("doc",doc)
        return res.end(JSON.stringify(data2));
    } catch (err:any) {
        return res.end(JSON.stringify({'error':err.message}));
    }

}
export default handler;