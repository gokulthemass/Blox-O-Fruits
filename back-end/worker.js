export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const getData = async () => {
      const data = await env.CRED_STORE.get('credentials', 'json');
      return data || [];
    };

    const setData = async (data) => {
      await env.CRED_STORE.put('credentials', JSON.stringify(data));
    };

    // Helper to safely parse JSON
    const parseBody = async () => {
      try {
        return await request.json();
      } catch (e) {
        return null;
      }
    };

    try {
      if (url.pathname === '/api/add' && request.method === 'POST') {
        const body = await parseBody();
        if (!body || !body.name || !body.gmail || !body.password) {
          return new Response(JSON.stringify({ error: 'name, gmail, and password are required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        
        const { name, gmail, password } = body;
        const data = await getData();
        data.push({ name, gmail, password });
        await setData(data);
        
        return new Response(JSON.stringify({ message: 'Data added successfully', data }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (url.pathname === '/api/login' && request.method === 'POST') {
        const body = await parseBody();
        if (!body || !body.gmail || !body.password) {
          return new Response(JSON.stringify({ error: 'gmail and password are required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        
        const { gmail, password } = body;
        const data = await getData();
        const user = data.find(u => u.gmail === gmail);
        
        if (!user) {
          return new Response(JSON.stringify({ error: 'User not found' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        
        if (user.password !== password) {
          return new Response(JSON.stringify({ error: 'Invalid password' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        
        return new Response(JSON.stringify({ message: 'Login successful', user }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (url.pathname === '/api/get' && request.method === 'GET') {
        const data = await getData();
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: corsHeaders
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message, stack: error.stack }), {
        status: 500,
        headers: corsHeaders
      });
    }
  }
};