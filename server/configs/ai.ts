
const generateImage = async (prompt: string, options: any = {}) => {
    // Cloudflare Workers AI expects a POST request with a JSON body
    const response = await fetch('https://image-api.bikiranmondal007.workers.dev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.WORKER_API_KEY}`
        },
        body: JSON.stringify({
            prompt,
            width: options.width || 1024,
            height: options.height || 576,
            num_inference_steps: options.num_inference_steps || 20,
            guidance_scale: options.guidance_scale || 7.5,
        }),
    });

    if (!response.ok) {
        throw new Error(`Cloudflare Workers AI error: ${response.status} ${response.statusText}`);
    }

    return response;
};

export default { textToImage: generateImage };