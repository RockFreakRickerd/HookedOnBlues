export async function onRequest({ request }) {
  const shareId = "3412ad8a4f33b594090aeac6f0d23bfa314";

  try {
    const url = new URL(request.url);
    const path = url.searchParams.get("path");

    const metadataUrl = path
      ? `https://jottacloud.com/s/${shareId}/metadata?path=${encodeURIComponent(path)}`
      : `https://jottacloud.com/s/${shareId}/metadata`;

    const res = await fetch(metadataUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    // If Jottacloud returns an error page
    if (!res.ok) {
      return new Response(
        JSON.stringify({
          error: "Jottacloud returned an error",
          status: res.status,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    let data;

    // Try to parse JSON safely
    try {
      data = await res.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON returned by Jottacloud" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Unexpected server error",
        details: err.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
