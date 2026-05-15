import { useState } from "react";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelected(i)}
            className={cn(
              "h-16 w-16 flex-shrink-0 overflow-hidden rounded border-2 transition-colors",
              selected === i
                ? "border-primary"
                : "border-transparent hover:border-muted-foreground",
            )}
          >
            <img
              src={img}
              alt={`${productName} — imagem ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="min-h-[300px] flex-1 overflow-hidden rounded-lg bg-muted sm:min-h-[400px]">
        <img
          src={images[selected]}
          alt={productName}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
