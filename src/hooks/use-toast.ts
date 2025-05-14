
import { useToast as useToastFromUI, toast as toastFromUI } from "@/components/ui/use-toast";

// Re-export the hook and toast function
export const useToast = useToastFromUI;
export const toast = toastFromUI;

export default useToast;
