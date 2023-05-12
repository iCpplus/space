import { get } from '@vercel/edge-config';


const getApiData = async () => {
    const greeting = await get('hello');
    console.log(greeting);
}

export default getApiData