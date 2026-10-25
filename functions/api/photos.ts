export async function onRequest(context) {
  const SUPABASE_URL = context.env.SUPABASE_URL;
  const SERVICE_ROLE = context.env.SUPABASE_SERVICE_ROLE;
  const BUCKET = context.env.SUPABASE_BUCKET;

  // Grab the "dir" search parameter from the incoming request URL
  const { searchParams } = new URL(context.request.url);
  const dirParam = searchParams.get("dir") || ""; 
  
  // Supabase prefixes must end with a trailing slash if they point to a directory
  const prefix = dirParam && !dirParam.endsWith("/") ? `${dirParam}/` : dirParam;

  const listUrl = `${SUPABASE_URL}/storage/v1/object/list/${BUCKET}`;

  const response = await fetch(listUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SERVICE_ROLE}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prefix: prefix,
      limit: 1000,
      offset: 0,
      sortBy: { column: "name", order: "asc" }
    })
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch from Supabase" }), {
      status: response.status,
      headers: { "Content-Type": "application/json" }
    });
  }

  const files = await response.json();
  const publicBase = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;

  // Map out items, distinguishing actual files from empty directory markers
  const items = files
    .filter(f => f.name !== ".emptyFolderPlaceholder") // Ignore Supabase empty folder placeholders
    .map(f => {
      // If f.id is null or missing, Supabase treats it as a nested directory metadata object
      const isDir = !f.id && !f.metadata;
      
      return {
        name: f.name,
        // If it's a directory, we don't build a public image URL link
        url: isDir ? "" : `${publicBase}/${prefix}${f.name}`,
        type: isDir ? "directory" : "file"
      };
    });

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" }
  });
}