const fetchMemes = async () => {
    try {
        const res = await fetch('./data/data.json');
        if (!res.ok) throw new Error(`Network error: ${res.status} ${res.statusText}`);
        const json = await res.json();
        return json;
    } catch (error) {
        console.error('dataService.fetchMemes failed', error);
        throw error;
    }
};

export default { fetchMemes };