export const removeHyperlinks = (text: string) => {
    // Regex to find all URLs /(https?:\/\/[^\s]+)/g;
    const regex = /\(https?:\/\/[^\s]+\)/g;
    return text.replace(regex, '');
};

export const validUrls = (url: string) => {
    // Check if the URL starts with 'http://' or 'https://'
    if (!/^https?:\/\//i.test(url)) {
        // If not, prepend 'https://'
        url = "https://" + url;
    }
    // Check if 'www.' is present
    if (!/^(https?:\/\/)?www\./i.test(url)) {
        // If not, prepend 'www.'
        url = url.replace(/^(https?:\/\/)?/i, "https://");
    }
    return url;
}

export const validateURl = (value: string) => {
    return value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/);
};

export const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };