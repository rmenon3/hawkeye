import { useState } from "react";

type APiState<T> = {
  status: "initial" | "loading" | "success" | "error";
  data: T;
};

const apiInitialState = { status: "initial", data: 0, audit: [] as [] };
const apiLoadingState = { status: "loading", data: 0, audit: [] as [] };
const apiErrorState = { status: "error", data: 0, audit: [] as [] };

const initialData = {
  perfomance: apiInitialState,
  accessibility: apiInitialState,
  security: apiInitialState,
  seo: apiInitialState,
};

const loadingState = {
  perfomance: apiLoadingState,
  accessibility: apiLoadingState,
  security: apiLoadingState,
  seo: apiLoadingState,
};

const validUrls = (url: string) => {
  // Check if the URL starts with 'http://' or 'https://'
  if (!/^https?:\/\//i.test(url)) {
    // If not, prepend 'https://'
    url = "https://" + url;
  }
  // Check if 'www.' is present
  if (!/^(https?:\/\/)?www\./i.test(url)) {
    // If not, prepend 'www.'
    url = url.replace(/^(https?:\/\/)?/i, "https://www.");
  }
  return url;
};

const getAuditResult = (data: any) => {
  const audits = data?.lighthouseResult?.audits;
  if (!audits) return [] as [];
  const improvements = Object.entries(audits).map(([key, value]) => {
    let ckey: any = key;
    return { value };
  });
  return improvements.filter((data: any) => {
    if (!data.value?.score) {
      return data.value;
    }
  }) as [];
};

export function useLightHouseAPI(value: string) {
  const currentUrl = validUrls(value);
  const finalUrl = "performance&strategy=desktop&url=";
  const finalAccUrl = "accessibility&strategy=desktop&url=";
  const finalSeoUrl = "seo&strategy=desktop&url=";
  const finalSecUrl = "best-practices&strategy=desktop&url=";
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      origin: currentUrl,
    }),
  };
  const [apiData, setAPIData] = useState(initialData);

  function fetchLightHouseAPIS() {
    setAPIData(loadingState);
    // ==========================================================
    //                   PERFORMANCE API
    // ==========================================================
    
    fetch("/api/customerData?category=" + finalUrl + currentUrl)
      .then((res) => res.json())
      .then((data: any) => {
        console.log('debug:: success::', data)
        // console.log(data);
        //   setShowWebsiteDashboard(true);
        let pScore = data?.lighthouseResult
          ? Math.round(
              data?.lighthouseResult?.categories?.performance?.score * 100
            )
          : 0;
        const audit = getAuditResult(data);

        setAPIData((state) => ({
          ...state,
          perfomance: { status: "success", data: pScore, audit },
        }));
      })
      .catch((error) => {
        // this.setState({ errorMessage: error.toString() });category=accessibility&category=best-practices&
        console.error("There was an error!", error);
        console.log('debug:: error::', error)
        setAPIData((state) => ({ ...state, perfomance: apiErrorState }));
      });


     // ==========================================================
     //                    ACCESSIBILITY
     // ========================================================== 

     fetch('/api/accessibilityData?category=accessibility&strategy=desktop&url=' + currentUrl)
      .then((res) => res.json())
      .then((data:any) => {
       
        let accScore = data?.lighthouseResult ? Math.round(data?.lighthouseResult?.categories?.accessibility?.score * 100):0;
        
        const audit = getAuditResult(data);

        setAPIData((state) => ({
          ...state,
          accessibility: { status: "success", data: accScore, audit },
        }));
        
       
      }).catch(error => {
        // this.setState({ errorMessage: error.toString() });category=accessibility&category=best-practices&
        console.error('There was an error!', error);
        setAPIData((state) => ({
          ...state,
          accessibility:apiErrorState,
        }));
      });

      // =========================================================
      //                   SEO 
      // =========================================================

      fetch('/api/seoData?category='+finalSeoUrl+currentUrl)
      .then((res) => res.json())
      .then((data:any) => {
       
        let seoScore = data?.lighthouseResult ? Math.round(data?.lighthouseResult?.categories?.seo?.score * 100):0;
      
        const audit = getAuditResult(data);

        setAPIData((state) => ({
          ...state,
          seo: { status: "success", data: seoScore, audit },
        }));
      }).catch(error => {
        console.error('There was an error!', error);
        setAPIData((state) => ({
          ...state,
          seo:apiErrorState,
        }));
      });

      // =========================================================
      //                   SECURITY
      // =========================================================

      fetch('/api/secData?category='+finalSecUrl+currentUrl)
      .then((res) => res.json())
      .then((data:any) => {
        let secScore = data?.lighthouseResult ? Math.round(data?.lighthouseResult?.categories["best-practices"]?.score * 100):0;
        const audit = getAuditResult(data);
        setAPIData((state) => ({
          ...state,
          security: { status: "success", data: secScore, audit },
        }));
      }).catch(error => {
        // this.setState({ errorMessage: error.toString() });category=accessibility&category=best-practices&
        console.error('There was an error!', error);
        setAPIData((state) => ({
          ...state,
          security:apiErrorState,
        }));
      });
  }

  return {fetchLightHouseAPIS, apiData};
}
