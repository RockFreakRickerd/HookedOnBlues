import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, Image as ImageIcon, AlertTriangle, ArrowLeft, Folder, ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface ApiItem {
  name: string;
  url: string;
  type: "file" | "directory";
}

export default function ImagesPage() {
  const [items, setItems] = useState<ApiItem[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Re-run this block every single time currentFolder changes!
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        
        // Pass the directory down to our query string
        const res = await fetch(`/api/photos?dir=${encodeURIComponent(currentFolder)}`);

        if (!res.ok) {
          throw new Error(`API returned status ${res.status}`);
        }

        const data: ApiItem[] = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("API did not return an array of items");
        }

        setItems(data);
      } catch (err: any) {
        setError(err.message || "Onbekende fout opgetreden bij het laden");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [currentFolder]);

  // Separate files and directories out of the server response
  const directories = items.filter(item => item.type === "directory");
  const files = items.filter(item => {
    if (item.type !== "file") return false;
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    return imageExtensions.some((ext) => item.name.toLowerCase().endsWith(ext));
  });

  const handleFolderClick = (dirName: string) => {
    // Append subfolders sequentially if we are deep-diving
    setCurrentFolder(prev => (prev ? `${prev}/${dirName}` : dirName));
  };

  const navigateToBreadcrumb = (index: number, parts: string[]) => {
    if (index === -1) {
      setCurrentFolder("");
    } else {
      const targetPath = parts.slice(0, index + 1).join("/");
      setCurrentFolder(targetPath);
    }
  };

  const navigateUp = () => {
    if (!currentFolder) return;
    const parts = currentFolder.split("/");
    parts.pop();
    setCurrentFolder(parts.join("/"));
  };

  // 1. Error View
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground gap-4">
        <AlertTriangle className="w-12 h-12 text-destructive" />
        <p className="text-xl font-accent">{error}</p>
        <Button onClick={() => window.location.reload()}>Opnieuw proberen</Button>
      </div>
    );
  }

  const pathParts = currentFolder ? currentFolder.split("/") : [];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <header className="glass-panel py-6 px-6 md:px-12 flex items-center justify-between sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>
        <h1 className="font-display text-xl md:text-2xl tracking-widest uppercase text-foreground flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" /> Media Galerij
        </h1>
        <div className="w-16 hidden sm:block" />
      </header>

      <div className="max-w-6xl mx-auto px-6 mt-12">
        {/* Dynamic Breadcrumbs Navigation */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 font-accent overflow-x-auto whitespace-nowrap py-2 border-b border-border/30 pb-4">
          <span 
            className={`cursor-pointer hover:text-primary transition-colors ${!currentFolder ? "text-foreground font-bold" : ""}`}
            onClick={() => navigateToBreadcrumb(-1, [])}
          >
            Root
          </span>
          {pathParts.map((part, index) => {
            const isLast = index === pathParts.length - 1;
            return (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
                <span 
                  className={`cursor-pointer hover:text-primary transition-colors ${isLast ? "text-foreground font-bold" : ""}`}
                  onClick={() => !isLast && navigateToBreadcrumb(index, pathParts)}
                >
                  {part}
                </span>
              </div>
            );
          })}
        </div>

        {/* Back Button inside subfolders */}
        {currentFolder && (
          <Button variant="outline" size="sm" onClick={navigateUp} className="mb-6 flex items-center gap-2 font-accent">
            <ArrowLeft className="w-4 h-4" /> Map Omhoog
          </Button>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="animate-pulse font-accent text-sm text-muted-foreground">Map laden...</p>
          </div>
        ) : directories.length === 0 && files.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-accent text-xl">
            Deze map is leeg.
          </div>
        ) : (
          <div className="space-y-12">
            {/* Folder Layout Container */}
            {directories.length > 0 && (
              <section>
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xs font-display uppercase tracking-wider text-muted-foreground">Mappen</h3>
                  <div className="h-[1px] bg-border/50 w-full" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {directories.map((dir) => (
                    <div
                      key={dir.name}
                      onClick={() => handleFolderClick(dir.name)}
                      className="flex items-center gap-3 p-4 border border-border bg-card/50 hover:bg-card hover:border-primary/50 cursor-pointer rounded-sm transition-all duration-200 group"
                    >
                      <Folder className="w-6 h-6 text-primary shrink-0 group-hover:scale-105 transition-transform" />
                      <span className="text-sm font-accent truncate text-foreground">{dir.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Photos Layout Container */}
            {files.length > 0 && (
              <section>
                <div className="mb-4 flex items-center gap-4">
                  <h2 className="font-display text-sm uppercase tracking-wider text-muted-foreground">
                    Afbeeldingen
                  </h2>
                  <div className="h-[1px] bg-border/50 w-full" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {files.map((img, idx) => (
                    <motion.div
                      key={img.url}
                      className="relative aspect-square overflow-hidden border border-border bg-card group cursor-pointer"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                      onClick={() => window.open(img.url, "_blank")}
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex items-end">
                        <span className="text-xs font-sans tracking-wide text-foreground truncate max-w-full">
                          {img.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}