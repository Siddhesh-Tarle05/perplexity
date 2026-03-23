import ImageKit from '@imagekit/nodejs';

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});
export const generateImage = async (prompt) => {
    const encodedPrompt = encodeURIComponent(prompt)
    // Construct ImageKit AI generation URL
    const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/
ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}-png?tr=w-800,
h-800 `;
    let response = await imagekit.files.upload({
        file: await fetch(`${generatedImageUrl}`),
        fileName: `${Date.now()}-generated-image.png`,
        folder: '/generated-images/'
    });

    console.log(response)
    return response.url;
}
