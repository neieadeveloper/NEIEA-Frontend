import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CourseCardNew from "@/components/CourseCardNew";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "sonner";

const RECOMMENDED_SIZE = "16:9 aspect ratio, at least 480x270px";
const AI_PROMPT =
  'A vibrant classroom scene with Indian children learning together, books and educational materials, bright and positive, 16:9 aspect ratio, 480x270px';

const initialForm = {
  title: "",
  description: "",
  duration: "",
  level: "beginner",
  category:"",
  fees: 0,
  targetAudience: "",
  whatsappLink: "",
  imageUrl: "",
  timeSlots: [] as string[],
  isNew: false,
};

export default function EditCoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    async function fetchCourse() {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/course/getOneCourse/${id}`);
        const c = res.data;
        setForm({
          title: c.title || "",
          description: c.description || "",
          duration: c.duration || "",
          level: c.level || "beginner",
          category: c.category || "",
          fees: c.fees || '0',
          targetAudience: (c.targetAudience || []).join(", "),
          whatsappLink: c.whatsappLink || "",
          imageUrl: c.imageUrl || "",
          timeSlots: c.timeSlots || [],
          isNew: c.isNew || false,
        });
        setCroppedImageUrl(c.imageUrl || "");
      } catch (e) {
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [id]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""));
      reader.readAsDataURL(e.target.files[0]);
      setIsCropping(true);
    }
  };

  const getCroppedImg = () => {
    const image = imgRef.current;
    if (!image || !crop || !crop.width || !crop.height) return;

    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;
    const displayWidth = image.width || naturalWidth;
    const displayHeight = image.height || naturalHeight;
    const unit = crop.unit || 'px';

    const toNaturalValue = (value: number | undefined, displayDim: number, naturalDim: number) => {
      if (value === undefined) return 0;
      if (unit === '%') {
        return (value / 100) * naturalDim;
      }
      return value * (naturalDim / displayDim);
    };

    const cropX = toNaturalValue(crop.x, displayWidth, naturalWidth);
    const cropY = toNaturalValue(crop.y, displayHeight, naturalHeight);
    const cropWidth = toNaturalValue(crop.width, displayWidth, naturalWidth);
    const cropHeight = toNaturalValue(crop.height, displayHeight, naturalHeight);

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(cropWidth));
    canvas.height = Math.max(1, Math.round(cropHeight));
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
    return canvas.toDataURL("image/jpeg");
  };

  const handleCrop = () => {
    const croppedDataUrl = getCroppedImg();
    if (croppedDataUrl) {
      setCroppedImageUrl(croppedDataUrl);
      setIsCropping(false);
    }
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const newCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        16 / 9,
        width,
        height
      ),
      width,
      height
    );
    setCrop(newCrop);
  }

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTimeSlotChange = (timeSlot: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      timeSlots: checked
        ? [...prev.timeSlots, timeSlot]
        : prev.timeSlots.filter((slot) => slot !== timeSlot),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      let response;
      if (croppedImageUrl && croppedImageUrl !== form.imageUrl) {
        // New image uploaded
        const data = new FormData();
        data.append("title", form.title);
        data.append("description", form.description);
        data.append("duration", form.duration);
        data.append("level", form.level);
        data.append("category", form.category);
        data.append("fees", String(form.fees));
        data.append("targetAudience", form.targetAudience);
        data.append("whatsappLink", form.whatsappLink);
        form.timeSlots.forEach((slot) => data.append("timeSlots[]", slot));
        data.append("isNew", form.isNew.toString());
        // Convert dataURL to File
        const arr = croppedImageUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        const file = new File([u8arr], "courseImage.jpeg", { type: mime });
        if (file.size > 1024 * 1024) {
          setError("Image size must be less than 1MB");
          setSaving(false);
          return;
        }
        data.append("image", file);
        response = await axiosInstance.put(`/admin/courses/edit/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // No new image
        response = await axiosInstance.put(`/admin/courses/edit/${id}`, {
          title: form.title,
          description: form.description,
          duration: form.duration,
          level: form.level,
          category: form.category,
          fees: form.fees,
          targetAudience: form.targetAudience,
          whatsappLink: form.whatsappLink,
          timeSlots: form.timeSlots,
          isNew: form.isNew,
        });
      }
      toast.success("Course updated successfully");
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update course");
    } finally {
      setSaving(false);
    }
  };

  // Live preview data
  const previewData = {
    ...form,
    targetAudience: form.targetAudience.split(",").map((s) => s.trim()).filter(Boolean),
    imageUrl: croppedImageUrl || form.imageUrl,
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-0">
      <h1 className="text-2xl font-bold mb-6 text-ngo-color6">Edit Course</h1>
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">{error}</div>
      ) : (
        <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Course Title *</label>
              <Input
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Overview *</label>
              <Textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration *</label>
              <Input
                value={form.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Level *</label>
              <select
                value={form.level}
                onChange={(e) => handleChange("level", e.target.value)}
                className="w-full border rounded px-2 py-2 text-sm"
                required
              >
                <option value="">Select Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full border rounded px-2 py-2 text-sm"
                required
              >
                <option value="">Select Category</option>
                <option value="english">English</option>
                <option value="math">Math</option>
                <option value="science">Science</option>
                <option value="social-science">Social Science</option>
                <option value="teachers-training">Teachers Training</option>
                <option value="technical">Technical</option>
                <option value="financial-literacy">Financial & Literacy</option>
                <option value="nios">NIOS</option>
                <option value="cbse">CBSE</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fees *</label>
              <Input
                type="number"
                value={form.fees}
                onChange={(e) => handleChange("fees", Number(e.target.value))}
                min={0}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Target Audience *</label>
              <Input
                value={form.targetAudience}
                onChange={(e) => handleChange("targetAudience", e.target.value)}
                placeholder="Comma separated"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">WhatsApp Link *</label>
              <Input
                value={form.whatsappLink}
                onChange={(e) => handleChange("whatsappLink", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Course Status</label>
              <div className="flex items-start space-x-3 space-y-0">
                <input
                  type="checkbox"
                  id="isNew"
                  checked={form.isNew}
                  onChange={(e) => handleChange("isNew", e.target.checked)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <div className="space-y-1 leading-none">
                  <label htmlFor="isNew" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Mark as New
                  </label>
                  <p className="text-sm text-gray-500">
                    Optional: Mark this course as new to highlight it on the courses page
                  </p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Convenient Time Slots *</label>
              <div className="text-sm text-gray-500 mb-2">
                Select all time slots that are available for this course
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "8:00 AM - 9:00 AM",
                  "9:00 AM - 10:00 AM",
                  "10:00 AM - 11:00 AM",
                  "11:00 AM - 12:00 PM",
                  "12:00 PM - 1:00 PM",
                  "1:00 PM - 2:00 PM",
                  "2:00 PM - 3:00 PM",
                  "3:00 PM - 4:00 PM",
                  "4:00 PM - 5:00 PM",
                  "5:00 PM - 6:00 PM",
                  "6:00 PM - 7:00 PM",
                  "7:00 PM - 8:00 PM",
                  "8:00 PM - 9:00 PM",
                  "9:00 PM - 10:00 PM",
                  "10:00 PM - 11:00 PM"
                ].map((timeSlot) => (
                  <div key={timeSlot} className="flex items-start space-x-3 space-y-0">
                    <Checkbox
                      checked={form.timeSlots.includes(timeSlot)}
                      onCheckedChange={(checked) => handleTimeSlotChange(timeSlot, checked as boolean)}
                    />
                    <label className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {timeSlot}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Course Image *</label>
              <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={onSelectFile}
              />
              <div className="text-xs text-gray-500 mt-1">
                Recommended size: <span className="font-medium">{RECOMMENDED_SIZE}</span> (max 1MB)
              </div>
              <div className="text-xs text-gray-400 mt-1 italic">
                Example prompt for AI image generation:<br />
                <span className="text-gray-600">"{AI_PROMPT}"</span>
              </div>
              {croppedImageUrl && (
                <div className="mt-2">
                  <img src={croppedImageUrl} alt="Cropped" className="h-32 rounded-md" />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="ml-2"
                    onClick={() => {
                      setCroppedImageUrl("");
                      setImgSrc("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    type="button"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
            {isCropping && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                  <h2 className="text-lg font-bold mb-4">Crop Image</h2>
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    aspect={16 / 9}
                  >
                    <img
                      ref={imgRef}
                      src={imgSrc}
                      alt="Source"
                      style={{ maxHeight: "60vh" }}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsCropping(false)} type="button">
                      Cancel
                    </Button>
                    <Button onClick={handleCrop} type="button">
                      Crop Image
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" type="button" onClick={() => navigate("/admin/dashboard")}>Cancel</Button>
              <Button type="submit" className="bg-ngo-color6 text-white font-bold" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
          {/* Live Preview */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-2 text-ngo-color6">Live Preview</h2>
              <div className="relative">

                {previewData.isNew && (
                  <div className="absolute top-0 left-0">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200 shadow-2xl">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                      NEW COURSE
                    </span>
                  </div>
                )}
              </div>
              <CourseCardNew {...previewData} />
            </div>
          </div>
        </form>
      )}
    </div>
  );
} 