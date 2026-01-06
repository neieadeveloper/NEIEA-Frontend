import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useRef } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

const courseSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Course overview is required").max(500),
  imageUrl: z.string().optional(),
  // instructor: z.string().min(1, "Instructor is required"),
  level: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Level is required",
  }),
  category: z.enum(["english", "math", "science", "social-science", "technical", "financial-literacy", "nios", "cbse", "other"], {
    required_error: "Category is required",
  }),
  duration: z.string().min(1, "Duration is required"),
  targetAudience: z.array(z.string()).min(1, "Target audience is required"),
  fees: z.number().min(0, "Fees must be a positive number"),
  whatsappLink: z.string().url("Must be a valid URL"),
  timeSlots: z.array(z.string()).min(1, "At least one time slot must be selected"),
  isNew: z.boolean().optional(),
});

const NewCourse = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      // instructor: "",
      level: undefined,
      category: undefined,
      duration: "",
      targetAudience: [""],
      fees: 0,
      whatsappLink: "",
      timeSlots: [],
      isNew: false
    },
  });

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    // formData.append("instructor", data.instructor);
    formData.append("level", data.level);
    formData.append("category", data.category);
    formData.append("duration", data.duration);
    data.targetAudience.forEach((ta) => formData.append("targetAudience[]", ta));
    formData.append("fees", data.fees.toString());
    formData.append("whatsappLink", data.whatsappLink);
    data.timeSlots.forEach((slot) => formData.append("timeSlots[]", slot));
    formData.append("isNew", data.isNew.toString());

    if (croppedImageUrl) {
      const imageFile = dataURLtoFile(croppedImageUrl, "courseImage.jpeg");
      formData.append("image", imageFile);
    }

    try {
      await axiosInstance.post("/admin/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Course created successfully");
      form.reset();
      setCroppedImageUrl("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Failed to create course");
      console.error("Create course error:", error);
    }
  };

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
    if (!image || !crop || !crop.width || !crop.height) {
      return;
    }

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
      form.setValue("imageUrl", croppedDataUrl);
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

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-ngo-color1 mb-2">Create New Course</h3>
        <p className="text-gray-600 text-lg">
          Fill in the details to create a new course
        </p>
      </div>
      
      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Course Title *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter course title" 
                        className="h-12 border-2 border-gray-300 focus:border-ngo-color1 focus:ring-2 focus:ring-ngo-color1/20 bg-white text-black"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="instructor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructor *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter instructor name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Level *</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="flex h-12 w-full items-center justify-between rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-ngo-color1 focus:ring-2 focus:ring-ngo-color1/20"
                      >
                        <option value="">Select a level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Category *</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="flex h-12 w-full items-center justify-between rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-ngo-color1 focus:ring-2 focus:ring-ngo-color1/20"
                      >
                        <option value="">Select a category</option>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Duration *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., 8 weeks" 
                        className="h-12 border-2 border-gray-300 focus:border-ngo-color1 focus:ring-2 focus:ring-ngo-color1/20 bg-white text-black"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Fees *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter course fees"
                        className="h-12 border-2 border-gray-300 focus:border-ngo-color1 focus:ring-2 focus:ring-ngo-color1/20 bg-white text-black"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Course Image *</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={onSelectFile}
                    className="h-12 border-2 border-gray-300 focus:border-ngo-color1 focus:ring-2 focus:ring-ngo-color1/20 bg-white text-black"
                  />
                </FormControl>
                <div className="text-xs text-gray-500 mt-1">
                  Recommended size: <span className="font-medium">16:9 aspect ratio, at least 480x270px</span> to match the crop frame and ensure sharp display on all screens.
                </div>
                <div className="text-xs text-gray-400 mt-1 italic">
                  Example prompt for AI image generation:<br/>
                  <span className="text-gray-600">"A vibrant classroom scene with Indian children learning together, books and educational materials, bright and positive, 16:9 aspect ratio, 480x270px"</span>
                </div>
                <FormMessage />
              </FormItem>
            </div>
            <Dialog open={isCropping} onOpenChange={setIsCropping}>
              <DialogContent className="bg-white text-black">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-700">Crop Image</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center">
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    aspect={16 / 9}
                  >
                    <img
                      ref={imgRef}
                      src={imgSrc}
                      alt="Source"
                      style={{ maxHeight: "70vh" }}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCropping(false)}
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCrop}
                    className="bg-ngo-color1 hover:bg-ngo-color2 text-white"
                  >
                    Crop Image
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {croppedImageUrl && (
              <div>
                <FormLabel className="text-sm font-semibold text-gray-700">Cropped Image Preview</FormLabel>
                <div className="mt-2 relative">
                  <img src={croppedImageUrl} alt="Cropped" className="h-48 rounded-md border border-gray-200" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setCroppedImageUrl("");
                        setImgSrc("");
                        form.setValue("imageUrl", "");
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">Overview *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter course overview - What will be taught?"
                      className="min-h-[120px] border-2 border-gray-300 focus:border-ngo-color1 focus:ring-2 focus:ring-ngo-color1/20 bg-white text-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">Target Audience *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter target audience, separated by commas"
                      className="h-12 border-2 border-gray-300 focus:border-ngo-color1 focus:ring-2 focus:ring-ngo-color1/20 bg-white text-black"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.split(','))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsappLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">WhatsApp Link *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter WhatsApp link" 
                      className="h-12 border-2 border-gray-300 focus:border-ngo-color1 focus:ring-2 focus:ring-ngo-color1/20 bg-white text-black"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isNew"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">Course Status</FormLabel>
                  <FormControl>
                    <div className="flex items-start space-x-3 space-y-0">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-2 border-gray-300 data-[state=checked]:bg-ngo-color1 data-[state=checked]:border-ngo-color1"
                      />
                      <div className="space-y-1 leading-none">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700">
                          Mark as New
                        </label>
                        <p className="text-sm text-gray-500">
                          Optional: Mark this course as new to highlight it on the courses page
                        </p>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="timeSlots"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base font-semibold text-gray-700">Convenient Time Slots *</FormLabel>
                    <div className="text-sm text-gray-500 mt-1">
                      Select all time slots that are available for this course
                    </div>
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
                      <FormField
                        key={timeSlot}
                        control={form.control}
                        name="timeSlots"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={timeSlot}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(timeSlot)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, timeSlot])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== timeSlot
                                          )
                                        )
                                  }}
                                  className="border-2 border-gray-300 data-[state=checked]:bg-ngo-color1 data-[state=checked]:border-ngo-color1"
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal text-gray-700">
                                {timeSlot}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                className="w-full md:w-auto bg-ngo-color4 hover:bg-ngo-color2 text-white font-bold shadow-lg border-2 transition-all duration-300 px-8 py-3 text-lg"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Create Course
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewCourse;
