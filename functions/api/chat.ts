export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const userMessage = body.message;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: userMessage }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify({ reply: data.choices[0].message.content }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Function error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch response from GROQ.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
