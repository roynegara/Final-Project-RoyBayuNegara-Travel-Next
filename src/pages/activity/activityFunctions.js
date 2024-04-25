import { useRouter } from "next/router";
import { toast } from "sonner";
import useDeleteActivity from "@/hooks/useDeleteActivity";
import useEditActivity from "@/hooks/useEditActivity";

export const handleDeleteActivity = async (activity) => {
  const { del } = useDeleteActivity();
  const router = useRouter();

  try {
    await del(`/delete-activity/${activity?.id}`);
    toast.success(`${activity?.title} has been deleted`);
    setTimeout(() => {
      router.push("/activity");
    }, 1000);
  } catch (err) {
    console.log("resDeleteActivityErr", err);
    toast.error(err?.response?.data?.message);
  }
};

export const handleEditActivity = async (activity) => {
  const { pos } = useEditActivity();
  const router = useRouter();

  try {
    await pos(`/update-activity/${activity?.id}`, { ...activity });
    toast.success(`${activity?.title} has been updated`);
    setTimeout(() => {
      router.push(`/activity/${activity?.id}`);
    }, 1000);
  } catch (err) {
    console.log("resEditActivityErr", err);
    if (
      err?.response?.data?.errors &&
      err?.response?.data?.errors.length > 0 &&
      err.response.data.errors[0].message
    ) {
      toast.error(err.response.data.errors[0].message);
    } else {
      toast.error(err?.response?.data?.message);
    }
  }
};

