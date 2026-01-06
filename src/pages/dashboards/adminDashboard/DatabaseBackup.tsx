import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Download, Database } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

const DatabaseBackup: React.FC = () => {
    const [format, setFormat] = useState<string>("json");
    const [loading, setLoading] = useState<boolean>(false);

    const handleDownload = async () => {
        if (!format) return;
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/admin/db-backup?format=${format}`, {
                responseType: "blob", // Important for binary data
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = `database-backup.zip`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            alert("Error downloading backup");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border rounded-lg shadow-sm">
            <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Database Backup
                </CardTitle>
                <CardDescription>
                    Download a full backup of the database in your preferred format.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Format Selector */}
                    <div className="flex items-center gap-3">
                        <span className="font-medium">Select Format:</span>
                        <Select value={format} onValueChange={(value) => setFormat(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Choose format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="json">JSON</SelectItem>
                                <SelectItem value="csv">CSV</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Download Button */}
                    <Button
                        onClick={handleDownload}
                        disabled={loading}
                        className="flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        {loading ? "Downloading..." : "Download Backup"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default DatabaseBackup;
