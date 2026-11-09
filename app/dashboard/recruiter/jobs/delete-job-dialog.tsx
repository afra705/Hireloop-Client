
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon, Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { deleteJob } from "@/lib/api/jobs";
import { toast } from "sonner";

type DeleteJobDialogProps = {
  jobId: string;
  jobTitle: string;
};

const DeleteJobDialog = ({
  jobId,
  jobTitle,
}: DeleteJobDialogProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    if (isDeleting) return;

    setOpen(nextOpen);

    if (!nextOpen) {
      setError(null);
    }
  };

const handleDelete = async () => {
  setIsDeleting(true);
  setError(null);

  try {
    await deleteJob(jobId);

    toast.success("Job deleted successfully!", {
      description: `${jobTitle} has been removed.`,
    });

    setOpen(false);
    router.refresh();
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to delete job";

    setError(message);

    toast.error("Delete failed!", {
      description: message,
    });
  } finally {
    setIsDeleting(false);
  }
};

  return (
    <>
      {/* Delete Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Delete ${jobTitle}`}
        title="Delete job"
        className="inline-flex size-6 items-center justify-center rounded-md text-[#7C7F87] transition-colors hover:bg-[#F87171]/10 hover:text-[#F87171] focus-visible:ring-2 focus-visible:ring-[#F87171]/60 focus-visible:outline-none"
      >
        <Trash2Icon className="size-3" />
      </button>

      {/* Confirmation Dialog */}
      <AlertDialog
        open={open}
        onOpenChange={handleOpenChange}
      >
        <AlertDialogContent className="border border-white/[0.08] bg-[#141416] text-[#F4F4F5] shadow-2xl ring-0 data-[size=default]:max-w-[420px] data-[size=default]:sm:max-w-105">

          <AlertDialogHeader className="flex flex-col items-start gap-2 text-left">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#F87171]/10 text-[#F87171]">
              <Trash2Icon className="size-5" />
            </div>

            <AlertDialogTitle className="mt-1 text-base font-semibold text-[#F4F4F5]">
              Delete job post?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-xs leading-5 text-[#A1A4AA]">
              Are you sure you want to delete{" "}
              <span className="font-medium text-[#F4F4F5]">
                {jobTitle}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-[#F87171]/20 bg-[#F87171]/10 px-3 py-2 text-[11px] leading-4 text-[#FCA5A5]"
            >
              {error}
            </p>
          )}

          <AlertDialogFooter className="border-white/[0.08] bg-transparent">

            <AlertDialogCancel
              disabled={isDeleting}
              className="h-8 border-white/[0.08] bg-transparent text-xs text-[#D4D4D8] hover:bg-white/[0.06] hover:text-white"
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              variant="destructive"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="h-8 bg-[#F87171] text-[#1A0A0A] hover:bg-[#FCA5A5] focus-visible:border-[#F87171]/40 focus-visible:ring-[#F87171]/20"
            >
              {isDeleting ? (
                <Loader2Icon className="size-3.5 animate-spin" />
              ) : (
                <Trash2Icon className="size-3.5" />
              )}

              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>

          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteJobDialog;
