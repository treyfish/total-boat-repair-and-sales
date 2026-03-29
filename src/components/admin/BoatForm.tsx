"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Upload, Trash2, ImageIcon } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import type { BoatFormData } from "@/lib/types";

interface BoatFormProps {
  initialData?: BoatFormData & { id?: string };
  isEditing?: boolean;
}

const statusOptions = [
  { value: "available", label: "Available" },
  { value: "pending", label: "Pending" },
  { value: "sold", label: "Sold" },
];

const fuelOptions = [
  { value: "Gas", label: "Gas" },
  { value: "Diesel", label: "Diesel" },
  { value: "Electric", label: "Electric" },
];

const hullOptions = [
  { value: "", label: "Select hull material" },
  { value: "Fiberglass", label: "Fiberglass" },
  { value: "Aluminum", label: "Aluminum" },
  { value: "Wood", label: "Wood" },
  { value: "Composite", label: "Composite" },
];

export function BoatForm({ initialData, isEditing }: BoatFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<string[]>(initialData?.photos || []);
  const [error, setError] = useState("");

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    setError("");

    const supabase = createClient();
    const newPhotos: string[] = [];
    const errors: string[] = [];

    for (const file of Array.from(files)) {
      // Resize large images before upload
      const processedFile = await resizeImage(file, 2560, 0.95);
      const ext = file.name.split(".").pop();
      const path = `boats/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("boat-photos")
        .upload(path, processedFile);

      if (uploadError) {
        errors.push(`${file.name}: ${uploadError.message}`);
      } else {
        const {
          data: { publicUrl },
        } = supabase.storage.from("boat-photos").getPublicUrl(path);
        newPhotos.push(publicUrl);
      }
    }

    if (errors.length > 0) {
      setError(`Upload failed for: ${errors.join(", ")}`);
    }

    setPhotos((prev) => [...prev, ...newPhotos]);
    setUploading(false);
    e.target.value = "";
  }

  async function resizeImage(file: File, maxWidth: number, quality: number): Promise<File> {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        if (img.width <= maxWidth) {
          resolve(file);
          return;
        }
        const canvas = document.createElement("canvas");
        const ratio = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * ratio;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: file.type }));
            } else {
              resolve(file);
            }
          },
          file.type,
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = URL.createObjectURL(file);
    });
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || null,
      price: formData.get("price")
        ? parseFloat(formData.get("price") as string)
        : null,
      year: formData.get("year")
        ? parseInt(formData.get("year") as string)
        : null,
      make: (formData.get("make") as string) || null,
      model: (formData.get("model") as string) || null,
      length_ft: formData.get("length_ft")
        ? parseFloat(formData.get("length_ft") as string)
        : null,
      engine_make: (formData.get("engine_make") as string) || null,
      engine_hp: formData.get("engine_hp")
        ? parseInt(formData.get("engine_hp") as string)
        : null,
      hull_material: (formData.get("hull_material") as string) || null,
      fuel_type: (formData.get("fuel_type") as string) || "Gas",
      status: formData.get("status") as string,
      featured: formData.get("featured") === "on",
      photos,
    };

    const supabase = createClient();

    if (isEditing && initialData?.id) {
      const { error: err } = await supabase
        .from("boats")
        .update(data)
        .eq("id", initialData.id);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: err } = await supabase.from("boats").insert(data);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    }

    router.push("/admin/boats");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <div className="bg-white rounded-xl p-6 md:p-8 border border-silver-light/50">
        <h2 className="font-heading font-semibold text-lg text-navy mb-6">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <Input
              id="name"
              name="name"
              label="Listing Name *"
              placeholder='e.g. "2019 Tracker Pro 170"'
              defaultValue={initialData?.name}
              required
            />
          </div>
          <Input
            id="year"
            name="year"
            label="Year"
            type="number"
            placeholder="2019"
            defaultValue={initialData?.year?.toString()}
          />
          <Input
            id="make"
            name="make"
            label="Make"
            placeholder="Tracker"
            defaultValue={initialData?.make}
          />
          <Input
            id="model"
            name="model"
            label="Model"
            placeholder="Pro 170"
            defaultValue={initialData?.model}
          />
          <Input
            id="price"
            name="price"
            label="Price"
            type="number"
            step="0.01"
            placeholder="Leave empty for 'Call for Price'"
            defaultValue={initialData?.price?.toString()}
          />
        </div>
        <div className="mt-5">
          <Textarea
            id="description"
            name="description"
            label="Description"
            placeholder="Describe the boat, its condition, features, etc."
            rows={4}
            defaultValue={initialData?.description || ""}
          />
        </div>
      </div>

      {/* Specs */}
      <div className="bg-white rounded-xl p-6 md:p-8 border border-silver-light/50">
        <h2 className="font-heading font-semibold text-lg text-navy mb-6">
          Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Input
            id="length_ft"
            name="length_ft"
            label="Length (ft)"
            type="number"
            step="0.1"
            placeholder="17.5"
            defaultValue={initialData?.length_ft?.toString()}
          />
          <Input
            id="engine_make"
            name="engine_make"
            label="Engine Make"
            placeholder="Honda"
            defaultValue={initialData?.engine_make}
          />
          <Input
            id="engine_hp"
            name="engine_hp"
            label="Horsepower"
            type="number"
            placeholder="60"
            defaultValue={initialData?.engine_hp?.toString()}
          />
          <Select
            id="hull_material"
            name="hull_material"
            label="Hull Material"
            options={hullOptions}
            defaultValue={initialData?.hull_material || ""}
          />
          <Select
            id="fuel_type"
            name="fuel_type"
            label="Fuel Type"
            options={fuelOptions}
            defaultValue={initialData?.fuel_type || "Gas"}
          />
        </div>
      </div>

      {/* Status */}
      <div className="bg-white rounded-xl p-6 md:p-8 border border-silver-light/50">
        <h2 className="font-heading font-semibold text-lg text-navy mb-6">
          Listing Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Select
            id="status"
            name="status"
            label="Status"
            options={statusOptions}
            defaultValue={initialData?.status || "available"}
          />
          <div className="flex items-center gap-3 mt-6">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              defaultChecked={initialData?.featured || false}
              className="w-5 h-5 rounded border-silver-light text-teal focus:ring-teal"
            />
            <label htmlFor="featured" className="text-sm font-semibold text-navy">
              Featured on homepage
            </label>
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="bg-white rounded-xl p-6 md:p-8 border border-silver-light/50">
        <h2 className="font-heading font-semibold text-lg text-navy mb-6">
          Photos
        </h2>

        {/* Photo grid */}
        {photos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {photos.map((url, i) => (
              <div key={i} className="relative group rounded-lg overflow-hidden aspect-[4/3] bg-off-white">
                <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                {i === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-teal/80 text-white text-[10px] font-semibold text-center py-1">
                    Primary
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Upload zone */}
        <label className="block border-2 border-dashed border-silver-light rounded-xl p-8 text-center cursor-pointer hover:border-teal/50 transition-colors">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
            disabled={uploading}
          />
          {uploading ? (
            <div className="text-teal">
              <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <span className="text-sm font-semibold">Uploading...</span>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-silver mx-auto mb-3" />
              <div className="text-sm font-semibold text-navy mb-1">
                Click to upload photos
              </div>
              <div className="text-xs text-text-muted">
                JPEG, PNG, or WebP. Max 10MB each.
              </div>
            </>
          )}
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button type="submit" size="lg" loading={saving}>
          <Save className="w-4 h-4" />
          {isEditing ? "Save Changes" : "Create Listing"}
        </Button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 text-text-muted hover:text-navy font-semibold transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
