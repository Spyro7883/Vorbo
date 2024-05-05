export default async function handler(req, res) {
    const apiUrl = `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/createUser`;

    try {
        const apiRes = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await apiRes.json();
        res.status(apiRes.status).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
