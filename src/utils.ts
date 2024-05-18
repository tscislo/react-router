export const getFromAPI = async (url: string, controller: AbortController) => {
    const signal = controller.signal;
    const response = await fetch(url, {signal});
    return await response.json();
}