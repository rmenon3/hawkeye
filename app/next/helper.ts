export const validUrls = (url: string) => {
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
