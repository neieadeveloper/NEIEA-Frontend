import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

const ReferredBy = () => {
  const [referredByList, setReferredByList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchReferredByList = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/course/referred-by-list");
        setReferredByList(response.data.data);
      } catch (error) {
        console.error("Failed to fetch referred-by list:", error);
        toast.error("Failed to fetch referred-by list");
      } finally {
        setLoading(false);
      }
    };
    fetchReferredByList();
  }, []);

  const onReferredBySubmit = async () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await axiosInstance.put(`/admin/referred-by/${editingId}`, { name });
        toast.success("Referred-by updated successfully");
      } else {
        await axiosInstance.post("/admin/referred-by", { name });
        toast.success("Referred-by created successfully");
      }
      setName("");
      setEditingId(null);
      const response = await axiosInstance.get("/course/referred-by-list");
      setReferredByList(response.data.data);
    } catch (error) {
      console.error("Failed to save referred-by:", error);
      toast.error("Failed to save referred-by");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/admin/referred-by/${id}`);
      toast.success("Referred-by deleted successfully");
      const response = await axiosInstance.get("/course/referred-by-list");
      setReferredByList(response.data.data);
    } catch (error) {
      console.error("Failed to delete referred-by:", error);
      toast.error("Failed to delete referred-by");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-none rounded-none">
      <CardHeader>
        <h3 className="text-xl">Add Referred By</h3>
        <p className="text-sm text-gray-500">
          Fill in the details of the person who referred you
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <Input
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Button onClick={onReferredBySubmit} disabled={loading}>
            {loading
              ? "Processing..."
              : editingId
              ? "Update Referred By"
              : "Add Referred By"}
          </Button>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Referred By List</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {referredByList.length > 0 ? (
                referredByList.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center justify-between p-4 border rounded"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently
                              delete the referred-by entry.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(item._id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </li>
                ))
              ) : (
                <p>No referred-by entries found.</p>
              )}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferredBy;
