import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { name, description, type } = await req.json();

    const prompt = `Create a modern, futuristic promotional image for a digital course called "${name}". 
    Description: ${description}
    Style: Sleek, professional, tech-inspired with neon green (#39FF14) and neon blue (#00E5FF) accents on dark background.
    The image should be suitable for a premium online learning platform.
    Include abstract tech elements, geometric shapes, and a sense of innovation and growth.
    No text should be in the image, just visual design.`;

    const result = await base44.integrations.Core.GenerateImage({ prompt });

    return Response.json({ image_url: result.url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});